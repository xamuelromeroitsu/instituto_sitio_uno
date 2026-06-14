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

JWT_SECRET = ENV.fetch('JWT_SECRET', 'itsu_secret_key_dev_2026')
