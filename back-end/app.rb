require 'sinatra/base'
require 'json'
require 'rack/cors'
require 'securerandom'

require_relative 'config/database'

Dir['./models/*.rb'].each { |f| require f }

require_relative 'lib/services/academic_service'

class App < Sinatra::Base
  use Rack::Cors do
    allow do
      origins '*'
      resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
    end
  end

  configure do
    set :show_exceptions, false
    set :raise_errors, false
  end

  before do
    content_type :json
    if request.content_type&.include?('application/json')
      body = request.body.read
      request.body.rewind
      @json_body = body.length > 0 ? (JSON.parse(body, symbolize_names: true) rescue {}) : {}
    else
      @json_body = {}
    end
  end

  options '*' do
    200
  end

  error do
    err = env['sinatra.error']
    $stderr.puts "ERROR: #{err.class}: #{err.message}"
    $stderr.puts err.backtrace.first(10).join("\n") if err.backtrace
    status 500
    { error: 'Error interno del servidor', detail: err.message }.to_json
  end

  not_found do
    { error: 'Ruta no encontrada' }.to_json
  end
end

require_relative 'routes/auth'
require_relative 'routes/dashboard'
require_relative 'routes/pagos'
