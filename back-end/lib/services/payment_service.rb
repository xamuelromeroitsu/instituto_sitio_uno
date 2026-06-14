require_relative '../entities/account'
require 'date'

module Services
  # PaymentService encapsula la lógica de negocio de aplicar pagos sobre
  # una `Entities::Account`. La clase no persiste datos por sí misma; solo
  # aplica cambios usando la API pública de la entidad (ej. `mark_paid`).
  class PaymentService
    # Aplica el pago de `months` meses comenzando en `start_month` (1-12).
    # - `account`: instancia de `Entities::Account`.
    # - `months`: cantidad de meses a pagar (entero >= 1).
    # - `start_month`: índice del mes donde iniciar el pago (opcional).
    # - `paid_on`: fecha del pago (por defecto, hoy).
    def self.pay(account, months, start_month = nil, paid_on = Date.today)
      raise ArgumentError, 'account debe responder a mark_paid' unless account.respond_to?(:mark_paid)
      raise ArgumentError, 'months debe ser >= 1' if months.to_i < 1

      start = start_month || account.months_unpaid.first
      raise "No hay meses disponibles para pagar" unless start && start <= 12

      months.times do |i|
        m = start + i
        raise "Mes fuera de rango" if m > 12
        account.mark_paid(m, paid_on)
      end
    end
  end
end
