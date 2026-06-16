class DashboardService
  def self.get_data(user_id)
    estudiante = Estudiante.where(usuario_id: user_id).first
    return nil, 'Estudiante no encontrado' unless estudiante

    data = {
      student: {
        nombre_completo: estudiante.nombre_completo,
        cedula_identidad: estudiante.cedula_identidad,
        estado_matricula: estudiante.respond_to?(:estado_matricula) ? estudiante.estado_matricula : 'activo'
      },
      classes: []
    }

    [data, nil]
  end
end
