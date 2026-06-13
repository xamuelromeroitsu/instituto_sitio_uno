require 'sequel'
require 'logger'

DB = Sequel.connect(
  adapter:  'postgres',
  host:     ENV.fetch('DB_HOST', 'localhost'),
  port:     ENV.fetch('DB_PORT', 5433),
  database: ENV.fetch('DB_NAME', 'itsu_db'),
  user:     ENV.fetch('DB_USER', 'postgres'),
  password: ENV.fetch('DB_PASS', ''),
  max_connections: 10
)

# Solo muestra las consultas SQL en desarrollo
DB.loggers << Logger.new($stdout) if ENV['RACK_ENV'] == 'development'