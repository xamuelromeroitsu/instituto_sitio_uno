# backend/app/infrastructure/api/modules/estudiantes/controllers.rb

# Importamos los servicios y esquemas necesarios para el módulo de estudiantes
require_relative 'services'
require_relative 'schemas'

module Estudiantes
  # Clase encargada de manejar las peticiones HTTP (Controlador) para estudiantes
  class Controller
    
    # [EST-2] (XR): Crear el controlador y contrato JSON para el endpoint seguro GET /estudiante/perfil
    # Recibe la petición (request) y los datos del estudiante que ya inició sesión (estudiante_autenticado)
    def self.obtener_perfil(request, estudiante_autenticado)
      
      # Extrae el token de seguridad desde las cabeceras de la petición
      token = request[:headers]["Authorization"]
      
      # Validación de seguridad: Si no hay token o está vacío, frena el proceso y devuelve un error 401 (No autorizado)
      return { status: 401, body: { error: "No autorizado. Token inválido o ausente." } } if token.nil? || token.empty?

      # Consumimos la lógica de negocio del índice académico que hiciste en el paso anterior (services_spec.rb)
      indice_calculado = Estudiantes::AcademicService.calcular_indice_acumulado(estudiante_autenticado)

      # Estructura el contrato JSON (respuesta) con toda la información limpia del perfil del estudiante
      perfil_response = {
        id: estudiante_autenticado[:id],
        nombre: estudiante_autenticado[:nombre],
        correo: estudiante_autenticado[:correo],
        materias: estudiante_autenticado[:materias],
        indice_academico: indice_calculado # Aquí se inyecta el índice ponderado que calculaste
      }

      # Retorna un estado exitoso 200 OK junto con el cuerpo del perfil listo
      {
        status: 200,
        body: perfil_response
      }
    end
  end
end