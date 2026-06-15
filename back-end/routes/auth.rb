require_relative '../models/usuario'
require_relative '../models/estudiante'
require_relative '../middleware/jwt_auth'
require 'net/http'
require 'openssl'

class App
  GOOGLE_CLIENT_ID = '67448746116-54ptvhc20hvenab7fjajcg5g079v8suk.apps.googleusercontent.com'
  GOOGLE_CERTS_URI = 'https://www.googleapis.com/oauth2/v3/certs'

  def self.verificar_token_google(id_token)
    return nil unless id_token

    header = JWT.decode(id_token, nil, false)[1]
    kid = header['kid']
    return nil unless kid

    uri = URI(GOOGLE_CERTS_URI)
    res = Net::HTTP.get(uri)
    certs_data = JSON.parse(res)
    keys = certs_data['keys']

    key_data = keys.find { |k| k['kid'] == kid }
    return nil unless key_data

    jwk = JWT::JWK.import(key_data)
    public_key = jwk.public_key

    decoded = JWT.decode(id_token, public_key, true, {
      algorithm: 'RS256',
      iss: ['https://accounts.google.com', 'accounts.google.com'],
      verify_iss: true,
      aud: GOOGLE_CLIENT_ID,
      verify_aud: true
    })
    payload = decoded[0]
    return nil unless payload['email_verified']

    payload
  rescue => e
    $stderr.puts "Google OAuth error: #{e.message}"
    nil
  end
  post '/api/auth/login' do
    content_type :json
    email = @json_body[:email]
    password = @json_body[:password]

    usuario = Usuario.where(email: email).first
    unless usuario && Usuario.verify_password(password, usuario[:password_digest])
      halt 401, { error: 'Credenciales inválidas' }.to_json
    end

    unless usuario[:activo]
      halt 403, { error: 'Cuenta desactivada' }.to_json
    end

    estudiante = usuario.estudiante
    token = Middleware::JwtAuth.encode({ id: usuario[:id], email: usuario[:email], rol: usuario[:rol] })
    nombre = estudiante ? "#{estudiante[:primer_nombre].force_encoding('UTF-8')} #{estudiante[:primer_apellido].force_encoding('UTF-8')}" : nil

    JSON.generate({
      token: token,
      user: {
        id: usuario[:id],
        email: usuario[:email],
        rol: usuario[:rol],
        nombre: nombre,
        provider: 'local'
      }
    })
  end

  post '/api/auth/register' do
    content_type :json
    DB.transaction do
      password = @json_body[:password]
      hashed = Usuario.hash_password(password)

      rol_value = @json_body[:rol].to_s.downcase
      allowed_roles = %w[estudiante profesor]
      unless allowed_roles.include?(rol_value)
        rol_value = 'estudiante'
      end

      usuario = Usuario.create(
        email: @json_body[:email],
        password_digest: hashed,
        rol: rol_value,
        activo: @json_body[:activo].nil? ? true : @json_body[:activo]
      )

      if @json_body[:primer_nombre]
        estudiante = Estudiante.create(
          usuario_id: usuario[:id],
          cedula_identidad: @json_body[:cedula_identidad],
          primer_nombre: @json_body[:primer_nombre],
          segundo_nombre: @json_body[:segundo_nombre],
          primer_apellido: @json_body[:primer_apellido],
          segundo_apellido: @json_body[:segundo_apellido],
          telefono: @json_body[:telefono]
        )
      end

      token = Middleware::JwtAuth.encode({ id: usuario[:id], email: usuario[:email], rol: usuario[:rol] })

      JSON.generate({
        token: token,
        user: {
          id: usuario[:id],
          email: usuario[:email].force_encoding('UTF-8'),
          rol: usuario[:rol]
        }
      })
    end
  end

  post '/api/auth/google' do
    content_type :json
    id_token = @json_body[:id_token]
    halt 400, { error: 'Token de Google requerido' }.to_json unless id_token

    payload = self.class.verificar_token_google(id_token)
    halt 401, { error: 'Token de Google inválido' }.to_json unless payload

    google_email = payload['email']
    google_name = payload['name'] || payload['email'].split('@').first
    name_parts = google_name.split(' ', 2)

    DB.transaction do
      usuario = Usuario.where(email: google_email).first

      unless usuario
        password_placeholder = SecureRandom.hex(32)
        usuario = Usuario.create(
          email: google_email,
          password_digest: Usuario.hash_password(password_placeholder),
          rol: 'estudiante',
          activo: true
        )

        Estudiante.create(
          usuario_id: usuario[:id],
          cedula_identidad: "GOOG-#{SecureRandom.hex(4).upcase}",
          primer_nombre: name_parts.first || google_name,
          primer_apellido: name_parts[1] || 'Google',
          telefono: nil
        )
      end

      estudiante = usuario.estudiante
      token = Middleware::JwtAuth.encode({ id: usuario[:id], email: usuario[:email], rol: usuario[:rol] })
      nombre = estudiante ? "#{estudiante[:primer_nombre].force_encoding('UTF-8')} #{estudiante[:primer_apellido].force_encoding('UTF-8')}" : google_name

      JSON.generate({
        token: token,
        user: {
          id: usuario[:id],
          email: usuario[:email],
          rol: usuario[:rol],
          nombre: nombre,
          provider: 'google'
        }
      })
    end
  end

  if ENV['RACK_ENV'] == 'development'
    post '/api/auth/google/dev' do
      content_type :json
      email = @json_body[:email]
      nombre = @json_body[:nombre] || email.split('@').first
      name_parts = nombre.split(' ', 2)

      halt 400, { error: 'Email requerido' }.to_json unless email

      DB.transaction do
        usuario = Usuario.where(email: email).first

        unless usuario
          password_placeholder = SecureRandom.hex(32)
          usuario = Usuario.create(
            email: email,
            password_digest: Usuario.hash_password(password_placeholder),
            rol: 'estudiante',
            activo: true
          )

          Estudiante.create(
            usuario_id: usuario[:id],
            cedula_identidad: "DEV-#{SecureRandom.hex(4).upcase}",
            primer_nombre: name_parts.first || nombre,
            primer_apellido: name_parts[1] || 'Google',
            telefono: nil
          )
        end

        estudiante = usuario.estudiante
        token = Middleware::JwtAuth.encode({ id: usuario[:id], email: usuario[:email], rol: usuario[:rol] })
        nombre_completo = estudiante ? "#{estudiante[:primer_nombre].force_encoding('UTF-8')} #{estudiante[:primer_apellido].force_encoding('UTF-8')}" : nombre

        JSON.generate({
          token: token,
          user: {
            id: usuario[:id],
            email: usuario[:email],
            rol: usuario[:rol],
            nombre: nombre_completo,
            provider: 'google'
          }
        })
      end
    end
  end
end
