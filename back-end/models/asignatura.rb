class Asignatura < Sequel::Model(:asignaturas)
  one_to_many :secciones, key: :asignatura_id
end
