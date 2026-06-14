require_relative '../models/factura'
require_relative '../models/estudiante'
require_relative '../middleware/jwt_auth'
require_relative '../lib/entities/account'
require_relative '../lib/services/payment_service'

class App
  def self.meses_estado(estudiante_id)
    facturas = Factura.where(estudiante_id: estudiante_id).all
    meses = []
    (1..12).each do |m|
      factura_mes = facturas.find { |f| f[:periodo_id] == m }
      pagada = (factura_mes && factura_mes[:estado_pago] == 'pagada') ? true : false
      meses << { mes: m, pagada: pagada, monto: factura_mes ? factura_mes[:monto_total_centavos] : nil }
    end
    pagadas = meses.count { |m| m[:pagada] }
    adeudadas = Date.today.month - pagadas
    adeudadas = 0 if adeudadas < 0
    { meses: meses, pagadas: pagadas, adeudadas: adeudadas }
  end

  get '/api/pagos/estado' do
    content_type :json
    usuario = Middleware::JwtAuth.authenticate(request.env)
    halt 401, JSON.generate({ error: 'No autorizado' }) unless usuario
    estudiante = usuario.estudiante
    halt 404, JSON.generate({ error: 'Estudiante no encontrado' }) unless estudiante
    JSON.generate(App.meses_estado(estudiante[:id]))
  end

  post '/api/pagos/consultar' do
    content_type :json
    cedula = @json_body[:cedula_identidad]
    nombre = @json_body[:primer_nombre]
    apellido = @json_body[:primer_apellido]

    unless cedula && !cedula.empty? && nombre && !nombre.empty? && apellido && !apellido.empty?
      halt 400, JSON.generate({ error: 'Debe ingresar cédula, nombre y apellido' })
    end

    estudiante = Estudiante.where(
      Sequel.lit("LOWER(cedula_identidad) = ? AND LOWER(primer_nombre) = ? AND LOWER(primer_apellido) = ?",
        cedula.downcase, nombre.downcase, apellido.downcase)
    ).first
    halt 404, JSON.generate({ error: 'Datos incorrectos. Estudiante no encontrado.' }) unless estudiante

    usuario = Usuario[estudiante[:usuario_id]]
    resultado = App.meses_estado(estudiante[:id])
    resultado[:estudiante] = {
      nombre: "#{estudiante[:primer_nombre]} #{estudiante[:primer_apellido]}",
      cedula: estudiante[:cedula_identidad],
      email: usuario ? usuario[:email] : nil
    }
    JSON.generate(resultado)
  end

  post '/api/pagos/pagar' do
    content_type :json
    usuario = Middleware::JwtAuth.authenticate(request.env)
    halt 401, JSON.generate({ error: 'No autorizado' }) unless usuario

    estudiante = usuario.estudiante
    halt 404, JSON.generate({ error: 'Estudiante no encontrado' }) unless estudiante

    mes = @json_body[:mes].to_i
    monto = @json_body[:monto].to_i
    referencia = @json_body[:referencia] || "REF-#{mes}-#{Time.now.to_i}"

    factura = Factura.where(estudiante_id: estudiante[:id]).where(Sequel.lit("EXTRACT(MONTH FROM fecha_vencimiento) = ?", mes)).first
    unless factura
      periodo = PeriodoLectivo.where(activo: true).first
      halt 404, JSON.generate({ error: 'Periodo activo no encontrado' }) unless periodo

      factura = Factura.create(
        estudiante_id: estudiante[:id],
        periodo_id: periodo[:id],
        monto_total_centavos: monto,
        fecha_vencimiento: Date.new(2026, mes, 15)
      )
    end

    factura.update(estado_pago: 'pagada')

    transaccion = DB[:transacciones_pagos].insert(
      factura_id: factura[:id],
      referencia_bancaria: referencia,
      metodo_pago: 'transferencia',
      monto_pagado_centavos: monto,
      estado_transaccion: 'confirmada'
    )

    JSON.generate({ success: true, mes: mes, estado: 'pagada', referencia: referencia })
  end
end
