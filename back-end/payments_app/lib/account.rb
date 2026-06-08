require 'date'

# Entities module agrupa las entidades del dominio (modelos puros y sin efectos secundarios).
module Entities
  # Account representa la cuenta de un alumno frente a las mensualidades del año.
  # Mantiene un ledger simple con un registro por mes (1-12) indicando si está pagado,
  # la fecha de pago y el monto. Esta clase expone una API mínima para consulta y
  # para marcar meses como pagados; la decisión de qué meses marcar queda en manos
  # de un service externo (ej. `Services::PaymentService`).
  class Account
    attr_reader :monthly_fee, :year

    def initialize(monthly_fee, year = Date.today.year)
      @monthly_fee = monthly_fee
      @year = year
      @ledger = {} # índice_mes (1-12) => { paid: booleano, paid_on: Date, amount: Numeric }
      (1..12).each { |m| @ledger[m] = { paid: false } }
    end

    # Marca un mes específico (1-12) como pagado.
    # No realiza validaciones de negocio complejas; solo cambia el estado del ledger.
    def mark_paid(month_index, paid_on = Date.today)
      raise "Mes fuera de rango" unless (1..12).include?(month_index)
      @ledger[month_index] = { paid: true, paid_on: paid_on, amount: monthly_fee }
    end

    # Retorna true si el mes indicado ya fue marcado como pagado.
    def paid?(month_index)
      @ledger[month_index] && @ledger[month_index][:paid]
    end

    # Lista de índices de meses pagados (ej: [1,2,5]).
    def months_paid
      @ledger.select { |k, v| v[:paid] }.keys.sort
    end

    # Lista de índices de meses no pagados.
    def months_unpaid
      @ledger.select { |k, v| !v[:paid] }.keys.sort
    end

    # Índice del mes actual según la fecha del sistema.
    def current_month_index
      Date.today.month
    end

    # Meses que, hasta el mes actual, deberían haber sido pagados y no lo están.
    def months_owed
      (1..current_month_index).select { |m| !paid?(m) }
    end

    # Meses futuros que ya fueron pagados por adelantado.
    def months_paid_in_advance
      (current_month_index+1..12).select { |m| paid?(m) }
    end

    # Monto total adeudado hasta el mes actual.
    def total_due
      months_owed.count * monthly_fee
    end

    # Monto total ya pagado en el año.
    def total_paid
      months_paid.count * monthly_fee
    end

    # Representación legible del ledger con claves `YYYY-MM` para facilitar
    # inspección desde la CLI o vistas simples.
    def ledger_snapshot
      @ledger.transform_keys { |m| Date.new(year, m, 1).strftime('%Y-%m') }
    end
  end
end
