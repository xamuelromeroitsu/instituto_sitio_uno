require 'sinatra/base'
require 'rack/cors'
require 'json'
require 'bcrypt'
require 'jwt'

require_relative 'config/database'
require_relative 'models/usuario'
require_relative 'models/estudiante'

JWT_SECRET = ENV.fetch('JWT_SECRET', 'itsu_secret_key_dev_2026')

class App < Sinatra::Base
  use Rack::Cors do
    allow do
      origins '*'
      resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
    end
  end

  configure do
    set :port, 9292
    set :bind, '0.0.0.0'
    set :show_exceptions, false
  end

  before do
    content_type :json
    if request.content_type&.include?('application/json')
      body = request.body.read
      @json_body = JSON.parse(body) unless body.empty?
    end
  end

  # ── Helpers ──

  helpers do
    def generar_token(payload)
      exp = Time.now.to_i + 24 * 3600
      JWT.encode(payload.merge(exp: exp), JWT_SECRET, 'HS256')
    end

    def decodificar_token(token)
      JWT.decode(token, JWT_SECRET, true, algorithm: 'HS256')[0]
    rescue JWT::DecodeError, JWT::ExpiredSignature
      nil
    end
  end

  # ── Rutas ──

  get '/' do
    { message: 'API ITSU — funcionando', status: 'ok' }.to_json
  end

  # POST /api/auth/register
  # Recibe { identificacion, nombre, apellido, email, password }
  # Crea un nuevo usuario + estudiante en la base de datos
  post '/api/auth/register' do
    data = @json_body
    halt 400, { error: 'Datos incompletos' }.to_json unless data

    begin
      DB.transaction do
        usuario = Usuario.create(
          email: data['email'],
          password_digest: BCrypt::Password.create(data['password']),
          rol: 'estudiante',
          activo: true
        )

        Estudiante.create(
          usuario_id: usuario.id,
          cedula_identidad: data['identificacion'],
          primer_nombre: data['nombre'],
          primer_apellido: data['apellido'],
          telefono: data['telefono']
        )

        token = generar_token('user_id' => usuario.id, 'email' => usuario.email, 'rol' => usuario.rol)

        status 201
        {
          mensaje: 'Estudiante registrado con éxito en el sistema ITSU.',
          token: token,
          user: {
            email: usuario.email,
            nombre: "#{data['nombre']} #{data['apellido']}",
            rol: usuario.rol
          }
        }.to_json
      end
    rescue Sequel::UniqueConstraintViolation
      halt 409, { error: 'El email o cédula ya están registrados' }.to_json
    rescue => e
      halt 500, { error: "Error al registrar en la base de datos: #{e.message}" }.to_json
    end
  end

  # POST /api/auth/login
  # Recibe { email, password }
  # Verifica credenciales y devuelve token
  post '/api/auth/login' do
    email = @json_body&.dig('email')
    password = @json_body&.dig('password')

    halt 401, { error: 'Email y contraseña requeridos' }.to_json unless email && password

    begin
      usuario = Usuario.where(email: email).first
      halt 401, { error: 'Credenciales inválidas' }.to_json unless usuario
      halt 401, { error: 'Cuenta inactiva' }.to_json unless usuario.activo

      unless BCrypt::Password.new(usuario.password_digest) == password
        halt 401, { error: 'Credenciales inválidas' }.to_json
      end

      estudiante = Estudiante.where(usuario_id: usuario.id).first

      token = generar_token('user_id' => usuario.id, 'email' => usuario.email, 'rol' => usuario.rol)

      {
        mensaje: 'Inicio de sesión exitoso.',
        token: token,
        user: {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol,
          nombre: estudiante&.nombre_completo
        }
      }.to_json
    rescue => e
      halt 500, { error: "Error al iniciar sesión: #{e.message}" }.to_json
    end
  end

  error do
    { error: env['sinatra.error'].message }.to_json
  end

  not_found do
    { error: 'Ruta no encontrada' }.to_json
  end
end

App.run! if __FILE__ == $PROGRAM_NAME
