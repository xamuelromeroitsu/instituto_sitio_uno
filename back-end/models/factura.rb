class Factura < Sequel::Model(:facturas)
  many_to_one :estudiante, key: :estudiante_id
  many_to_one :periodo_lectivo, key: :periodo_id
  one_to_many :transacciones_pagos, key: :factura_id
end
