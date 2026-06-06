# 🧠 Lógica de Negocio y Estructura Modular del Sistema
## 🏛️ Diseño de Arquitectura Orientada a Dominios (RBAC)

Este documento detalla la división de responsabilidades del sistema, separando de manera implacable la **Lógica de Computación** (infraestructura, base de datos, protocolos) de la **Lógica de Negocio** (reglas académicas, finanzas y permisos institucionales) evaluando los estándares de las plataformas educativas más grandes del mundo.

---

## 🧭 Navegación del Sistema

<div align="center" style="margin: 20px 0; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
  <a href="./README.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/🏠_Inicio-Repositorio-4A5568?style=for-the-badge" alt="Inicio"/>
  </a>
  <a href="./README_METODOLOGIA.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/🧩_Metodología-SOLID_--_TDD-3182CE?style=for-the-badge" alt="Metodologia"/>
  </a>
  <a href="./README_TECNOLOGIAS.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/💻_Tecnologías-Ruby_--_Postgres-CC342D?style=for-the-badge" alt="Tecnologias"/>
  </a>
</div>

---

## 🔐 El Núcleo de Seguridad (Control de Acceso Basado en Roles)

Al igual que las plataformas globales de nivel educativo, el sistema no maneja accesos genéricos. Implementa un modelo **RBAC (Role-Based Access Control)**. El usuario es una identidad única, pero sus permisos específicos abren o cierran módulos tanto en la interfaz de JavaScript como en los endpoints del servidor de Ruby.

* **Lógica Computacional:** El backend procesa las credenciales en texto plano, las verifica usando hashing seguro con **BCrypt** contra PostgreSQL y emite un token **JWT (JSON Web Token)** firmado y cifrado que el cliente de JavaScript almacena de forma segura.
* **Lógica de Negocio:** El sistema extrae las políticas del rol incrustado en el JWT. Si el rol es `Estudiante`, la lógica de negocio valida si está solvente a nivel financiero antes de permitirle registrar una asignatura. Si es `Administrativo`, se salta esta validación y le expone herramientas de auditoría.

---

## 📊 Desglose de Dominios para la Vida Real

| 🧩 Módulo | 🚀 Impacto en la Vida Real | 📋 Lógica de Negocio (Ruby Services) | 💻 Lógica Computacional (Infraestructura) |
| :--- | :--- | :--- | :--- |
| **🔑 Autenticación** | Protege las rutas y controla el ingreso de personal y alumnos. | Validar vigencia del token y estados de suspensión de cuentas. | Cifrado BCrypt, parsing de JSON y codificación de payloads JWT. |
| **👤 Estudiantes** | Campus virtual personalizado y expediente digital del alumno. | Control de avance de carrera y cálculo automatizado del promedio ponderado. | Operaciones CRUD sobre la tabla `estudiantes` en PostgreSQL. |
| **📚 Académico** | Planificación de periodos, horarios, asignaturas y evaluaciones. | Restricción de edición de actas de notas vencidas el cierre de lapso. | Validar arrays de notas entrantes desde la UI mediante esquemas estrictos. |
| **📁 Materiales** | Repositorio didáctico para descargar recursos y guías de estudio. | Control de visibilidad de recursos según la sección del alumno. | Serialización de subida de archivos (Multipart data) en disco o la nube. |
| **💳 Finanzas** | Gestión y conciliación de pagos de matrículas y aranceles. | Desbloqueo inmediato de accesos académicos tras validar el pago exitoso. | Consumo de Webhooks de pasarelas de pago y registro contable inmutable. |
| **⚙️ Administración**| Panel de control global, auditoría y reportes masivos. | Generación de estadísticas de rendimiento estudiantil y cierres de año. | Trazas de logs del sistema y queries analíticos complejos de SQL. |

---

## 📁 Estructura del Código Fuente (Módulos Encapsulados)

Para cumplir el **Principio de Responsabilidad Única (SRP)** a nivel arquitectónico, cada dominio de negocio está completamente aislado dentro del directorio `modules/`:

```text
backend/app/infrastructure/api/modules/
├── autenticacion/         # 🔑 Módulo Core de Seguridad
│   ├── config.rb          # Registro de rutas en la API global
│   ├── controllers.rb     # Manejo de peticiones HTTP de JS e intercambio JSON
│   ├── models.rb          # Estructura física de la tabla de credenciales de usuario
│   ├── schemas.rb         # Validación estricta de Payloads de entrada (Dry-Validation)
│   └── services.rb        # Lógica pura: Encriptación con BCrypt y emisión de JWT
│
├── estudiantes/           # 👤 Módulo: Estudiante Autogestión / Campus Virtual
│   ├── config.rb
│   ├── controllers.rb     # Endpoints de consulta: GET /estudiante/perfil
│   ├── models.rb          # Modelos de entidad del estudiante y datos de matrícula
│   ├── schemas.rb         # Formateadores de salida JSON optimizados para JavaScript
│   └── services.rb        # Reglas: Cálculo de índices académicos acumulados
│
├── academico/             # 📚 Módulo: Notas, Horarios y Asignaturas
│   ├── config.rb
│   ├── controllers.rb     # Endpoints: POST /academico/notas, GET /academico/horarios
│   ├── models.rb          # Tablas de Secciones, Asignaturas y Actas
│   ├── schemas.rb         # Validación de arrays de notas enviados por la UI
│   └── services.rb        # Cierre automático de actas e inasistencias
│
├── materiales/            # 📁 Módulo: Recursos de Campus Virtual
│   ├── config.rb
│   ├── controllers.rb     # Control de cargas (Multipart form-data) desde JavaScript
│   ├── models.rb          # Almacenamiento de metadatos de archivos multimedia
│   ├── schemas.rb         # Restricciones de formato, tamaño y extensiones permitidas
│   └── services.rb        # Adaptador para almacenamiento local o Cloud Storage
│
├── finanzas/              # 💳 Módulo: Pagos y Control Financiero
│   ├── config.rb
│   ├── controllers.rb     # Endpoints: POST /finanzas/pagar (Procesar tokens de pago)
│   ├── models.rb          # Tablas de Facturas, Aranceles y Cuentas por Cobrar
│   ├── schemas.rb         # Validación de datos transaccionales bancarios
│   └── services.rb        # Procesamiento, conciliación y desbloqueo de sistemas
│
└── administracion/        # ⚙️ Módulo: Personal Administrativo & Dashboard
    ├── config.rb
    ├── controllers.rb     # Endpoints del Dashboard administrativo consumidos por JS
    ├── models.rb          # Registros de personal de oficina y trazas de auditoría
    ├── schemas.rb         # Esquemas de configuración del periodo lectivo
    └── services.rb        # Generación masiva de reportes en PDF/Excel y cierres de ciclo