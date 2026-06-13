class App
  post '/api/auth/register' do
    data = @json_body
    halt 400, { error: 'Datos incompletos' }.to_json unless data

    result = AuthSchema::Register.call(data)
    halt 422, { error: result.errors.to_h }.to_json unless result.success?

    begin
      usuario = AuthService.register(result.to_h)

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
    rescue Sequel::UniqueConstraintViolation
      halt 409, { error: 'El email o cédula ya están registrados' }.to_json
    rescue => e
      halt 500, { error: "Error al registrar en la base de datos: #{e.message}" }.to_json
    end
  end

  post '/api/auth/login' do
    email = @json_body&.dig('email')
    password = @json_body&.dig('password')

    halt 401, { error: 'Email y contraseña requeridos' }.to_json unless email && password

    result = AuthSchema::Login.call(@json_body)
    halt 422, { error: result.errors.to_h }.to_json unless result.success?

    begin
      usuario, estudiante, error = AuthService.login(email, password)
      halt 401, { error: error }.to_json if error

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
end
