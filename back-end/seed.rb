require_relative 'config/database'
require_relative 'models/usuario'
require_relative 'models/estudiante'
require_relative 'models/asignatura'
require_relative 'models/seccion'
require_relative 'models/periodo_lectivo'
require_relative 'models/inscripcion'

puts "Sembrando datos demo..."

unless Usuario.where(email: 'estudiante@itsu.edu.ve').count > 0
  hashed = Usuario.hash_password('1234')
  u = Usuario.create(
    email: 'estudiante@itsu.edu.ve',
    password_digest: hashed,
    rol: 'estudiante',
    activo: true
  )

  e = Estudiante.create(
    usuario_id: u[:id],
    cedula_identidad: 'V-00000000',
    primer_nombre: 'Estudiante',
    primer_apellido: 'Prueba',
    telefono: '+0000000000'
  )

  per = PeriodoLectivo.where(codigo: '2026-I').first
  unless per
    per = PeriodoLectivo.create(codigo: '2026-I', fecha_inicio: Date.new(2026,1,15), fecha_fin: Date.new(2026,5,30), activo: true)
  end

  asig = Asignatura.where(codigo: 'PROG-101').first
  unless asig
    asig = Asignatura.create(codigo: 'PROG-101', nombre: 'Programación Web con Python y JS', unidades_credito: 4)
  end

  sec = Seccion.where(codigo_seccion: 'SEC-01').first
  unless sec
    sec = Seccion.create(
      asignatura_id: asig[:id],
      periodo_id: per[:id],
      codigo_seccion: 'SEC-01',
      horario: Sequel.pg_jsonb([{ dia: 'Lunes', bloque: '18:00-20:00' }, { dia: 'Miercoles', bloque: '18:00-20:00' }]),
      aula: 'Laboratorio 3',
      cupo_maximo: 30
    )
  end

  Inscripcion.create(estudiante_id: e[:id], seccion_id: sec[:id], nota_final: 15.00, estado_materia: 'cursando')

  puts "Usuario demo creado: estudiante@itsu.edu.ve / 1234 (con inscripcion)"
else
  puts "Usuario demo ya existe, verificando datos..."
  u = Usuario.where(email: 'estudiante@itsu.edu.ve').first
  e = Estudiante.where(usuario_id: u[:id]).first
  if e && Inscripcion.where(estudiante_id: e[:id]).count == 0
    per = PeriodoLectivo.where(activo: true).first || PeriodoLectivo.first
    asig = Asignatura.first
    if asig && per
      sec = Seccion.where(asignatura_id: asig[:id], periodo_id: per[:id]).first
      unless sec
        sec = Seccion.create(
          asignatura_id: asig[:id],
          periodo_id: per[:id],
          codigo_seccion: 'SEC-01',
          horario: Sequel.pg_jsonb([{ dia: 'Lunes', bloque: '18:00-20:00' }, { dia: 'Miercoles', bloque: '18:00-20:00' }]),
          aula: 'Laboratorio 3',
          cupo_maximo: 30
        )
      end
      Inscripcion.create(estudiante_id: e[:id], seccion_id: sec[:id], nota_final: 15.00, estado_materia: 'cursando')
      puts "Inscripcion agregada al usuario existente"
    end
  end
end
