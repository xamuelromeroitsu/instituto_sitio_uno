# Modulo principal que agrupa la lógica del negocio de los estudiantes
module Estudiantes
  
  # Clase encargada de los servicios académicos del estudiante
  class AcademicService
    
    # [EST-1] Método para calcular el índice académico acumulado de un estudiante.
    # Recibe un objeto 'estudiante' que contiene una lista de materias.
    def self.calcular_indice_acumulado(estudiante)
      # Extrae las materias del estudiante. Si no tiene, asigna una lista vacía.
      materias = estudiante[:materias] || []
      
      # Si el estudiante no tiene materias registradas, retorna un índice de 0.0
      return 0.0 if materias.empty?

      # Inicializadores para acumular los puntos totales y los créditos cursados
      total_puntos = 0.0
      total_credits = 0.0

      # Recorre cada una de las materias del estudiante para hacer el cálculo
      materias.each do |materia|
        # Convierte los créditos y la nota de la materia a números flotantes (decimales)
        creditos = materia[:creditos].to_f
        nota = materia[:nota].to_f
        
        # Multiplica la nota por los créditos correspondientes para obtener el puntaje ponderado
        total_puntos += (nota * creditos)
        # Acumula los créditos en el contador total
        total_credits += creditos
      end

      # Evita la división entre cero si los créditos totales son igual a 0
      return 0.0 if total_credits.zero?

      # Retorna el índice ponderado final redondeado a dos decimales
      (total_puntos / total_credits).round(2)
    end
    
  end
end 