DB = Sequel.connect(
  adapter:  'postgres',
  host:     ENV.fetch('DB_HOST', 'localhost'),
  port:     ENV.fetch('DB_PORT', 5432),
  database: ENV.fetch('DB_NAME', 'itsu_db'),
  user:     ENV.fetch('DB_USER', 'postgres'),
  password: ENV.fetch('DB_PASS', ''),
  max_connections: 10
)

DB.loggers << Logger.new($stdout) if ENV['RACK_ENV'] == 'development'
