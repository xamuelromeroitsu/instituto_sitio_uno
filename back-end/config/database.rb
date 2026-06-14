DB = Sequel.connect('postgres://postgres:dinosaurioxa@localhost:5432/itsu2')

DB.loggers << Logger.new($stdout) if ENV['RACK_ENV'] == 'development'

# Validar si conecta bien
begin
  if DB.test_connection
    puts "🚀 [Sequel] ¡Conexión exitosa al contenedor de PostgreSQL!"
    
    # Prueba leer las tablas que creaste por consola
    puts "Tablas detectadas en la base de datos:"
    puts DB.tables # Debería imprimir [:asignaturas, :estudiantes, :usuarios]
  end
rescue => e
  puts "❌ Error al conectar a la base de datos: #{e.message}"
end