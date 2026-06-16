class Estudiante < Sequel::Model
  many_to_one :usuario

  def nombre_completo
    "#{primer_nombre} #{primer_apellido}"
  end
end
