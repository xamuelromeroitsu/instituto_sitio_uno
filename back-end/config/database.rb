# ── Cargar variables de entorno desde .env ──
if File.exist?(File.join(__dir__, '..', '.env'))
  File.readlines(File.join(__dir__, '..', '.env')).each do |line|
    next if line.strip.empty? || line.start_with?('#')
    key, value = line.strip.split('=', 2)
    ENV[key] = value if key && value
  end
end

require 'sequel'
require 'logger'

DB = Sequel.connect(
  adapter:  'postgres',
  host:     ENV.fetch('DB_HOST', 'localhost'),
  port:     ENV.fetch('DB_PORT', 5432),
  database: ENV.fetch('DB_NAME', 'itsu_db'),
  user:     ENV.fetch('DB_USER', 'postgres'),
  password: ENV.fetch('DB_PASS', 'dinosaurioxa'),
  max_connections: 10
)

DB.loggers << Logger.new($stdout) if ENV['RACK_ENV'] == 'development'
