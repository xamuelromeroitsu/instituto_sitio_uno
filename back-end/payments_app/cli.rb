#!/usr/bin/env ruby
require_relative 'lib/entities/student'
require_relative 'lib/account'
require_relative 'lib/services/payment_service'
require 'date'

puts "Demo modular: Sistema de pagos de mensualidades (OOP, clases independientes)"
student = Entities::Student.new(1, 'Carlos Perez')
account = Entities::Account.new(100.0)

puts "Alumno creado: #{student.name} (ID #{student.id})"
puts "Mes actual: #{Date.today.strftime('%B')}"

puts "Estado inicial:"
puts "  Meses pagados: #{account.months_paid.inspect}"
puts "  Meses adeudados hasta hoy: #{account.months_owed.inspect}"

puts "Realizando pago de 2 meses (lógica hecha por PaymentService)..."
Services::PaymentService.pay(account, 2)

puts "Después del pago:"
puts "  Meses pagados: #{account.months_paid.inspect}"
puts "  Meses pagados por adelantado: #{account.months_paid_in_advance.inspect}"
puts "  Total pagado: $#{account.total_paid}"
puts "  Total adeudado: $#{account.total_due}"

puts "Ledger (por mes):"
account.ledger_snapshot.each do |month, info|
  status = info[:paid] ? "PAGADO (#{info[:paid_on]})" : 'NO'
  puts "  #{month}: #{status}"
end
