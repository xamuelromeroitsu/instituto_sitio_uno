class App
  get '/api/dashboard' do
    auth_header = request.env['HTTP_AUTHORIZATION']
    halt 401, { error: 'Token requerido' }.to_json unless auth_header

    token = auth_header.gsub(/^Bearer\s+/i, '')
    payload = decodificar_token(token)
    halt 401, { error: 'Token inválido o expirado' }.to_json unless payload

    data, error = DashboardService.get_data(payload['user_id'])
    halt 404, { error: error }.to_json if error

    data.to_json
  end
end
