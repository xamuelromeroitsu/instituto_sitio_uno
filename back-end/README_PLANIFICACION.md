# 📅 Planificación del Proyecto por Oleadas y Responsables
## ⚙️ Cronograma de Desarrollo Modular (Backend y Frontend)

Este documento contiene la hoja de ruta dividida por **Oleadas de Trabajo**, asignando responsabilidades específicas a cada integrante del equipo por día para evitar solapamientos en el código y asegurar entregas incrementales bajo TDD.

---

## 🧭 Navegación de la Documentación

<div align="center" style="margin: 20px 0; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
  <a href="./README.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/🏠_Inicio-Repositorio-4A5568?style=for-the-badge" alt="Inicio"/>
  </a>
  <a href="./README_MODULOS.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/🧠_Arquitectura-Módulos_Core-805AD5?style=for-the-badge" alt="Módulos"/>
  </a>
</div>

---

## 👥 Roles del Equipo de Ingeniería
* **💻 Ángel Colmenares (AC):** Backend Specialist & Database Optimizer.
* **🎨 Alan Mendoza (AM):** Frontend Architect & UI/UX Developer.
* **🚀 Xamuel Romero (XR):** Integrador de Arquitectura, DevOps & API Contracts.

---

## 🌊 Oleada 1: Cimientos, Autenticación y Estudiantes
**Objetivo:** Levantar la base del proyecto, el sistema de seguridad central (RBAC) y el core del perfil estudiantil.

### 📅 Día 1: Setup e Infraestructura Base
* [ ] **[INFRA-1] (XR):** Configurar entorno Docker, Docker Compose y esqueleto de enrutamiento Roda en la raíz.
* [x] **[UI-1] (AM):** Crear estructura base `index.html`, configurar Tailwind CSS y el enrutador básico de la SPA en JS.
* [ ] **[DB-1] (AC):** Diseñar migraciones iniciales en PostgreSQL para las tablas de `usuarios` y `estudiantes` usando Sequel.

### 📅 Día 2: Módulo de Autenticación (Core de Seguridad)
* [ ] **[AUTH-1] (XR):** Escribir pruebas unitarias (RSpec) y lógica para el hash de claves con BCrypt y emisión de tokens JWT en `services.rb`.
* [ ] **[AUTH-2] (AC):** Implementar `schemas.rb` (Dry-Validation) y los endpoints en `controllers.rb` para el Login.
* [ ] **[AUTH-3] (AM):** Diseñar vista de Login en la SPA, capturar el formulario con JS y almacenar el JWT de forma segura en `localStorage`.

### 📅 Día 3: Módulo de Estudiantes (Autogestión)
* [ ] **[EST-1] (AC):** Desarrollar la lógica de negocio para el cálculo del índice académico acumulado en `estudiantes/services.rb`.
* [ ] **[EST-2] (XR):** Crear el controlador y contrato JSON para el endpoint seguro `GET /estudiante/perfil`.
* [ ] **[EST-3] (AM):** Crear la interfaz del *Dashboard del Estudiante* en la SPA consumiendo los datos del perfil mediante `fetch()` con el token de seguridad.

---

## 🌊 Oleada 2: Núcleo Académico y Recursos Virtuales
**Objetivo:** Permitir que la lógica escolar cobre vida con la gestión de materias, secciones y carga de recursos educativos.

### 📅 Día 4: Módulo Académico (Horarios y Asignaturas)
* [ ] **[ACA-1] (AC):** Crear modelos y lógicas de validación para evitar choques de horarios de alumnos al inscribirse en `academico/services.rb`.
* [ ] **[ACA-2] (XR):** Implementar endpoints `GET /academico/horarios` y `POST /academico/notas` con protección de roles (RBAC).
* [ ] **[ACA-3] (AM):** Desarrollar la vista de grilla de horarios interactiva y el formulario de carga de notas exclusivo para profesores.

### 📅 Día 5: Módulo de Materiales (Campus Virtual)
* [ ] **[MAT-1] (XR):** Implementar el cargador de archivos (Multipart data) en Ruby y restringir formatos y pesos máximos en `schemas.rb`.
* [ ] **[MAT-2] (AC):** Modelar la persistencia de metadatos de recursos didácticos asociados a secciones específicas.
* [ ] **[MAT-3] (AM):** Diseñar el panel de descargas de guías de estudio dentro de la SPA con estados visuales limpios.

---

## 🌊 Oleada 3: Finanzas, Administración y Cierre
**Objetivo:** Controlar las pasarelas de pago, paneles administrativos y refactorización final bajo estándares SOLID.

### 📅 Día 6: Módulo de Finanzas (Pasarela y Solvencias)
* [ ] **[FIN-1] (AC):** Crear el procesador de transacciones simuladas y la regla de negocio para el desbloqueo automático de matrícula.
* [ ] **[FIN-2] (XR):** Diseñar el endpoint `POST /finanzas/pagar` y blindar con pruebas automatizadas sus respuestas JSON.
* [ ] **[FIN-3] (AM):** Construir el módulo visual de "Estado de Cuenta" y pasarela de pago rápido dentro de la SPA.

### 📅 Día 7: Módulo de Administración y Refactorización Global
* [ ] **[ADM-1] (AC):** Crear queries SQL avanzados en Ruby para extraer analíticas de rendimiento del instituto en tiempo real.
* [ ] **[ADM-2] (AM):** Diseñar el *Admin Dashboard* con gráficos interactivos y controles de configuración global del periodo lectivo.
* [ ] **[REF-1] (XR & Equipo):** Ejecutar revisión final con RuboCop, asegurar cobertura total de pruebas en RSpec y optimizar la SPA.

---

## 🚀 Instrucciones para Trabajar con este Tablero
1. Al iniciar una tarea, el desarrollador responsable debe crear una rama con el identificador del código: `git checkout -b feature/AUTH-1`.
2. Una vez completado el código y aprobadas las pruebas locales, se abre un Pull Request hacia la rama principal.
3. Al fusionar (*merge*) la tarea, el integrante edita este archivo colocando una `x` en la casilla correspondiente: `- [x] [AUTH-1]`.

<div align="center" style="margin-top: 30px;">
  <p><b>¡Mantengamos el repositorio limpio, los commits semánticos y las pruebas en verde!</b> 🧪🟢</p>
</div>
