# backend/app/infrastructure/api/modules/estudiantes/config.rb

# Importamos el controlador para poder conectar las rutas con la lógica interna
require_relative 'controllers'

module Estudiantes
  # Clase encargada de la configuración y mapeo de rutas para el módulo de estudiantes
  class Config
    
    # Método para registrar las rutas del módulo en el enrutador principal (router) de la API
    def self.registrar_rutas(router)
      
      # Registro de la ruta en la API global
      # Cuando se reciba una petición HTTP GET a "/estudiante/perfil", se ejecutará este bloque
      router.get("/estudiante/perfil") do |request, estudiante_sesion|
        
        # Redirige la petición al controlador pasándole los datos de la solicitud y de la sesión activa
        Estudiantes::Controller.obtener_perfil(request, estudiante_sesion)
      end
    end
  end
end