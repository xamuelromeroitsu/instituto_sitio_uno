# backend/app/infrastructure/api/modules/estudiantes/schemas.rb

module Estudiantes
  # Clase encargada de definir las reglas de validación (esquemas) del módulo
  class Schemas
    
    # Contrato JSON para validar que la estructura del perfil del estudiante sea correcta
    PERFIL_SCHEMA = {
      type: "object", # Define que el contenedor principal debe ser un objeto
      required: ["id", "nombre", "correo", "materias"], # Campos obligatorios que no pueden faltar
      properties: {
        # El ID del estudiante debe ser un número entero
        id: { type: "integer" },
        
        # El nombre debe ser una cadena de texto (string)
        nombre: { type: "string" },
        
        # El correo debe ser un texto y cumplir obligatoriamente con el formato institucional (.itsu@gmail.com)
        correo: { type: "string", pattern: "^[a-zA-Z0-9._%+-]+.itsu@gmail.com$" },
        
        # Las materias deben venir dentro de un arreglo (lista)
        materias: {
          type: "array",
          # Cada elemento dentro de la lista de materias debe cumplir con las siguientes propiedades:
          items: {
            type: "object",
            required: ["codigo", "creditos", "nota"], # Datos obligatorios por cada materia
            properties: {
              # El código de la materia (ej: "MAT101") debe ser texto
              codigo: { type: "string" },
              
              # Los créditos deben ser un número entero y como mínimo valer 1
              creditos: { type: "integer", minimum: 1 },
              
              # La nota debe ser un número entero entre 0 y 20 (escala estándar)
              nota: { type: "integer", minimum: 0, maximum: 20 }
            }
          }
        }
      }
    }
  end
end