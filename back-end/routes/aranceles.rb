require_relative '../models/arancel'
require_relative '../middleware/jwt_auth'

class App
  get '/api/aranceles/mensualidad' do
    arancel = Arancel.where(descripcion: 'Mensualidad').first
    halt 404, JSON.generate({ error: 'Arancel no encontrado' }) unless arancel
    JSON.generate({
      id: arancel[:id],
      descripcion: arancel[:descripcion],
      monto: arancel[:monto_centavos],
      moneda: arancel[:moneda]
    })
  end

  put '/api/aranceles/mensualidad' do
    usuario = Middleware::JwtAuth.authenticate(request.env)
    halt 401, JSON.generate({ error: 'No autorizado' }) unless usuario
    halt 403, JSON.generate({ error: 'Solo administradores pueden modificar el monto' }) unless usuario[:rol] == 'administrador'

    nuevo_monto = @json_body[:monto].to_i
    halt 400, JSON.generate({ error: 'Monto inválido' }) if nuevo_monto <= 0

    arancel = Arancel.where(descripcion: 'Mensualidad').first
    halt 404, JSON.generate({ error: 'Arancel no encontrado' }) unless arancel

    arancel.update(monto_centavos: nuevo_monto)
    JSON.generate({ success: true, monto: nuevo_monto })
  end
end
