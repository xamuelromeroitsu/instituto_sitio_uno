require 'date'

module Entities
  # Student es una entidad simple que representa la identidad del alumno.
  # No contiene lógica de pagos ni acceso directo al ledger. La separación
  # permite que `Student` sea usada en diferentes contextos sin efectos secundarios.
  class Student
    attr_accessor :id, :name

    def initialize(id, name)
      @id = id
      @name = name
    end
  end
end

