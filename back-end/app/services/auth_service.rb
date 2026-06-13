class AuthService
  def self.register(data)
    DB.transaction do
      usuario = Usuario.create(
        email: data['email'],
        password_digest: BCrypt::Password.create(data['password']),
        rol: 'estudiante',
        activo: true
      )

      Estudiante.create(
        usuario_id: usuario.id,
        cedula_identidad: data['cedula_identidad'],
        primer_nombre: data['primer_nombre'],
        primer_apellido: data['primer_apellido'],
        segundo_nombre: data['segundo_nombre'],
        segundo_apellido: data['segundo_apellido'],
        telefono: data['telefono']
      )

      usuario
    end
  end

  def self.login(email, password)
    usuario = Usuario.where(email: email).first
    return [nil, nil, 'Credenciales inválidas'] unless usuario
    return [nil, nil, 'Cuenta inactiva'] unless usuario.activo
    return [nil, nil, 'Credenciales inválidas'] unless BCrypt::Password.new(usuario.password_digest) == password

    estudiante = Estudiante.where(usuario_id: usuario.id).first
    [usuario, estudiante, nil]
  end
end
