class Usuario < Sequel::Model
  one_to_one :estudiante
end
