require_relative 'config/environment'

class App < Sinatra::Base
  use Rack::Cors do
    allow do
      origins '*'
      resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
    end
  end

  configure do
    set :port, 9292
    set :bind, '0.0.0.0'
    set :show_exceptions, false
  end

  before do
    content_type :json
    if request.content_type&.include?('application/json')
      body = request.body.read
      @json_body = JSON.parse(body) unless body.empty?
    end
  end

  helpers AuthHelper

  get '/' do
    { message: 'API ITSU — funcionando', status: 'ok' }.to_json
  end

  error do
    { error: env['sinatra.error'].message }.to_json
  end

  not_found do
    { error: 'Ruta no encontrada' }.to_json
  end
end

require_relative 'app/routes/auth_routes'
require_relative 'app/routes/dashboard_routes'
