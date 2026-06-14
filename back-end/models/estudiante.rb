class Estudiante < Sequel::Model(:estudiantes)
  many_to_one :usuario, key: :usuario_id
  one_to_many :inscripciones, key: :estudiante_id
  one_to_many :facturas, key: :estudiante_id
end
