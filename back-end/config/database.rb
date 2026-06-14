gem 'postgres-pr'
require 'pg'
require 'sequel'

DB = Sequel.connect(
  adapter: 'postgres',
  host: '/tmp/opencode',
  port: 5433,
  user: 'usuario',
  database: 'itsu_db',
  encoding: 'UTF8'
)

