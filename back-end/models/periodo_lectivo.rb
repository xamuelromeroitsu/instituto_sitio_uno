class PeriodoLectivo < Sequel::Model(:periodos_lectivos)
  one_to_many :secciones, key: :periodo_id
end
