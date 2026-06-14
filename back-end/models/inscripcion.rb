class Inscripcion < Sequel::Model(:inscripciones)
  many_to_one :estudiante, key: :estudiante_id
  many_to_one :seccion, key: :seccion_id
end
