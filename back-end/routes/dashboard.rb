require_relative '../models/estudiante'
require_relative '../models/inscripcion'
require_relative '../models/seccion'
require_relative '../models/asignatura'
require_relative '../models/periodo_lectivo'
require_relative '../middleware/jwt_auth'

require_relative '../lib/entities/account'
require_relative '../lib/services/academic_service'

class App
  get '/api/dashboard' do
    content_type :json
    usuario = Middleware::JwtAuth.authenticate(request.env)
    halt 401, { error: 'No autorizado' }.to_json unless usuario

    estudiante = usuario.estudiante
    halt 404, { error: 'Estudiante no encontrado' }.to_json unless estudiante

    inscripciones = Inscripcion.where(estudiante_id: estudiante[:id]).all
    materias_data = inscripciones.map do |ins|
      seccion = Seccion[ins[:seccion_id]]
      asignatura = seccion ? Asignatura[seccion[:asignatura_id]] : nil
      horario_raw = seccion ? seccion[:horario] : nil
      horario_parsed = horario_raw.is_a?(String) ? (JSON.parse(horario_raw) rescue horario_raw) : horario_raw
      horario_str = if horario_parsed.is_a?(Array)
        horario_parsed.map { |h| "#{h['dia'] || h[:dia]} #{h['bloque'] || h[:bloque]}" }.join(', ')
      else
        horario_parsed.to_s
      end
      {
        creditos: asignatura ? asignatura[:unidades_credito] : 0,
        nota: ins[:nota_final] || 0,
        codigo: asignatura ? asignatura[:codigo] : nil,
        nombre: asignatura ? asignatura[:nombre] : nil,
        horario: horario_str,
        aula: seccion ? seccion[:aula] : nil,
        profesor: nil,
        estado: ins[:estado_materia]
      }
    end

    indice = Estudiantes::AcademicService.calcular_indice_acumulado(
      { materias: materias_data.map { |m| { creditos: m[:creditos], nota: m[:nota] } } }
    )

    aprobadas = inscripciones.count { |i| i[:nota_final] && i[:nota_final] >= 10 }
    creditos_total = materias_data.sum { |m| m[:creditos] }

    enc = ->(v) { v.is_a?(String) ? v.force_encoding('UTF-8') : v }

    payload = {
      student: {
        nombre: enc.call("#{estudiante[:primer_nombre]} #{estudiante[:primer_apellido]}"),
        cedula: enc.call(estudiante[:cedula_identidad]),
        carrera: 'Desarrollo de Software'
      },
      summary: {
        promedio: indice,
        materiasAprobadas: aprobadas,
        materiasInscritas: inscripciones.count,
        creditos: creditos_total
      },
      classes: materias_data.map { |m|
        {
          codigo: enc.call(m[:codigo]),
          nombre: enc.call(m[:nombre]),
          profesor: m[:profesor],
          horario: enc.call(m[:horario]),
          aula: enc.call(m[:aula])
        }
      }
    }
    JSON.generate(payload)
  end
end
