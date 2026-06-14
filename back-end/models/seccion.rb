class Seccion < Sequel::Model(:secciones)
  many_to_one :asignatura, key: :asignatura_id
  many_to_one :periodo_lectivo, key: :periodo_id, class: :PeriodoLectivo
  one_to_many :inscripciones, key: :seccion_id
end
