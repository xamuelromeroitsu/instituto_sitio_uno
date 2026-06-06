🏛️ Instituto Tecnológico Sitio Uno- Sistema de Gestión Unificado


🚀 Single Page Application (SPA) para el Control de Estudios

Bienvenido al repositorio central del Sistema de Gestión Unificado. Esta aplicación web está diseñada como una solución moderna, rápida y eficiente para digitalizar y automatizar los procesos administrativos y académicos de un instituto tecnológico en el mundo real.



🧭 Navegación Rápida de la Documentación

Usa estos botones interactivos para explorar las diferentes dimensiones técnicas y metodológicas del proyecto:




🎯 Objetivo del Proyecto

El objetivo principal es reemplazar los sistemas obsoletos o procesos manuales en papel por una SPA (Single Page Application) ultra ligera que centraliza las operaciones en una sola pestaña del navegador, garantizando una experiencia de usuario fluida, sin recargas de página y con alta consistencia de datos gracias a una arquitectura limpia en el backend.



🚀 Funcionalidades para la Vida Real

Para que este software sea verdaderamente útil en el día a día de una institución educativa, el sistema resuelve necesidades reales divididas por los tres actores principales del entorno académico:




📐 Arquitectura y Stack Tecnológico
Este proyecto ha sido diseñado bajo los estándares más exigentes de la ingeniería de software, utilizando un enfoque de Monolito Modular y Arquitectura Limpia (Clean Architecture) en Ruby, asegurando que las reglas del negocio sean independientes de la infraestructura.

🧩 Diseño por Dominios (DDD): Código organizado en módulos independientes y desacoplados (estudiantes, academico, finanzas) que representan contextos reales del campus virtual.

🛡️ Principios SOLID: Estricta separación de responsabilidades. Los controladores se limitan a comunicar la API con el cliente, delegando la lógica pura a servicios aislados.

🧪 Desarrollo Guiado por Pruebas (TDD): Implementación del ciclo Red-Green-Refactor con RSpec y Rack-Test, garantizando contratos de respuestas JSON 100% estables.

⚡ API REST Pura para JavaScript: Diseñado específicamente para responder payloads JSON de alta velocidad, optimizado con middlewares de seguridad, CORS y control de flujo (Rate Limiting).

🛠️ Tecnologías Utilizadas
Backend Core: Ruby 3.3 + Roda (Routing Tree Framework) + Puma (Servidor concurrente)

Datos y Persistencia: PostgreSQL / MariaDB + Sequel ORM (Gestión avanzada de Pool de conexiones)

Seguridad y Contratos: JWT (Autenticación por Roles RBAC) + BCrypt + Dry-Validation

Infraestructura: Docker / Podman + Docker Compose (Entornos aislados y listos para producción)

Calidad de Código: RSpec + RuboCop (Linter oficial de la comunidad Ruby)



Integrantes
Angel Colmenares:
Alan Mendoza:
Xamuel Romero: 32226948


