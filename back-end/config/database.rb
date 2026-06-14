DB = Sequel.connect(
  adapter:  'postgres',
  host:     ENV.fetch('DB_HOST', 'localhost'),
  port:     ENV.fetch('DB_PORT', 5432),
  database: ENV.fetch('DB_NAME', 'itsu'),
  user:     ENV.fetch('DB_USER', 'postgres'),
  password: ENV.fetch('DB_PASS', 'dinosaurioxa'),
  max_connections: 10
)

DB.loggers << Logger.new($stdout) if ENV['RACK_ENV'] == 'development'


if File.exist?(File.join(__dir__, '..', '.env'))
  File.readlines(File.join(__dir__, '..', '.env')).each do |line|
    next if line.strip.empty? || line.start_with?('#')
    key, value = line.strip.split('=', 2)
    ENV[key] = value if key && value
  end
end

require 'sinatra/base'
require 'rack/cors'
require 'json'
require 'bcrypt'
require 'jwt'
require 'sequel'
require 'logger'
require 'dry-validation'

require_relative 'database'
require_relative '../models/usuario'
require_relative '../models/estudiante'
require_relative '../app/helpers/auth_helper'
require_relative '../app/validators/auth_schema'
require_relative '../app/services/auth_service'
require_relative '../app/services/dashboard_service'