require 'sinatra/base'
require 'rack/cors'
require 'json'

require_relative 'config/environment'
require_relative 'config/database'

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

  get '/' do
    { message: 'API ITSU — funcionando', status: 'ok' }.to_json
  end

  get '/api/health' do
    conectado = DB.test_connection
    { db: conectado ? 'conectado' : 'error' }.to_json
  end

  error do
    { error: env['sinatra.error'].message }.to_json
  end

  not_found do
    { error: 'Ruta no encontrada' }.to_json
  end
end
