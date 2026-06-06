# 🏛️ Instituto Tecnológico Sitio Uno
## 🚀 Sistema de Gestión Unificado (Control de Estudios)

Bienvenido al repositorio central del **Sistema de Gestión Unificado**. Esta aplicación web está diseñada como una solución moderna, rápida y eficiente para digitalizar y automatizar los procesos administrativos y académicos de un instituto tecnológico en el mundo real mediante una arquitectura SPA (Single Page Application).

---

## 🧭 Navegación Rápida de la Documentación

Usa estos botones interactivos para explorar las diferentes dimensiones técnicas y metodológicas del proyecto:

<div align="center" style="margin: 20px 0; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
  <a href="./README_METODOLOGIA.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/🧩_Metodología-SOLID_--_TDD-3182CE?style=for-the-badge" alt="SOLID y TDD"/>
  </a>
  <a href="./README_TECNOLOGIAS.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/💻_Tecnologías-Ruby_--_Postgres-CC342D?style=for-the-badge" alt="Stack Tecnológico"/>
  </a>
  <a href="./README_MODULOS.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/🧠_Arquitectura-Módulos_Core-805AD5?style=for-the-badge" alt="Módulos"/>
  </a>
</div>

---

## 🎯 Objetivo del Proyecto

El objetivo principal es reemplazar los sistemas obsoletos o procesos manuales en papel por una **SPA (Single Page Application)** ultra ligera que centraliza las operaciones en una sola pestaña del navegador. Esto garantiza una experiencia de usuario fluida, libre de recargas de página y respaldada por una alta consistencia de datos gracias a una arquitectura limpia e implacable en el backend.

---

## 🚀 Funcionalidades para la Vida Real

Para que este software sea verdaderamente útil en el día a día de una institución educativa, el sistema resuelve necesidades reales divididas por los tres actores principales del entorno académico:

### 👨‍🎓 1. Portal del Estudiante (Autogestión Dinámica)
* **Inscripción de Asignaturas en Tiempo Real:** Permite a los alumnos matricularse en sus secciones de forma digital, validando automáticamente que no existan choques de horarios.
* **Consulta de Historial Académico:** Visualización inmediata de las calificaciones cargadas por semestre, índices académicos y estado de aprobación de materias.

### 👨‍🏫 2. Portal del Docente (Control de Evaluaciones)
* **Carga Centralizada de Notas:** Interfaz simplificada para que el profesor asigne las calificaciones de sus secciones directamente al sistema.
* **Gestión de Secciones:** Acceso a las listas de estudiantes inscritos por materia en tiempo real, facilitando el control de asistencia y seguimiento.

### 💼 3. Módulo Administrativo (Estructura y Control)
* **Gestión de Oferta Académica:** Creación de nuevas materias, apertura de secciones, asignación de profesores a aulas y configuración de periodos lectivos.
* **Control de Matrículas:** Registro de nuevos estudiantes en la base de datos y validación de solvencias administrativas.

---

## 📐 Arquitectura del Sistema

Este proyecto ha sido diseñado bajo los estándares más exigentes de la ingeniería de software, utilizando un enfoque de **Monolito Modular** y **Arquitectura Limpia (Clean Architecture)** en Ruby, asegurando que las reglas del negocio sean independientes de la infraestructura.

* **🧩 Diseño por Dominios (DDD):** Código organizado en módulos independientes y desacoplados (`estudiantes`, `académico`, `finanzas`) que representan contextos reales del campus virtual.
* **🛡️ Principios SOLID:** Estricta separación de responsabilidades. Los controladores se limitan a comunicar la API con el cliente, delegando la lógica pura a servicios aislados.
* **🧪 Desarrollo Guiado por Pruebas (TDD):** Implementación rigurosa del ciclo *Red-Green-Refactor* con **RSpec** y **Rack-Test**, garantizando contratos de respuestas JSON 100% estables.
* **⚡ API REST Pura para JavaScript:** Diseñado específicamente para responder cargas útiles JSON de alta velocidad, optimizado con middlewares de seguridad, CORS y control de flujo (*Rate Limiting*).

---

## 🛠️ Stack Tecnológico Utilizado

El ecosistema técnico se divide estratégicamente para soportar alta concurrencia y seguridad:

| Componente | Tecnología Seleccionada | Propósito Arquitectónico |
| :--- | :--- | :--- |
| **🚀 Backend Core** | Ruby 3.3 + Roda + Puma | Framework de enrutamiento en árbol ultra rápido y servidor concurrente. |
| **📊 Datos y Persistencia** | PostgreSQL / MariaDB + Sequel ORM | Gestión avanzada de *Pool* de conexiones y consultas SQL eficientes. |
| **🔐 Seguridad y Contratos**| JWT + BCrypt + Dry-Validation | Autenticación por Roles (RBAC), hash de claves y validación estricta de payloads. |
| **🐳 Infraestructura** | Docker / Podman + Docker Compose | Entornos de desarrollo aislados, idénticos y listos para producción. |
| **🧪 Calidad de Código** | RSpec + RuboCop | Suite de pruebas automatizadas y linter oficial de la comunidad Ruby. |

---

## 👥 Equipo de Desarrollo (Integrantes)

A continuación se detallan los autores de esta solución de software:

| Nombre y Apellido | Cédula de Identidad / Rol |
| :--- | :--- |
| 💻 **Ángel Colmenares** | Desarrollador de Software Core |
| 🎨 **Alan Mendoza** | Diseñador de UI & Frontend Specialist |
| 🚀 **Xamuel Romero** | Arquitecto de Software (CI/CD) - **32226948** |

---

<div align="center" style="margin-top: 40px;">
  <p>Diseñado con ❤️ para el Instituto Tecnológico</p>
  <p><b>Estatus del Proyecto:</b> En Desarrollo Activo 🛠️</p>
</div>
