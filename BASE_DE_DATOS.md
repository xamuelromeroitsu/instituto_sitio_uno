# 🗄️ Especificación de la Base de Datos - ITSU

Este documento detalla la estructura, funcionalidad y procedimientos de configuración de la base de datos PostgreSQL para el **Instituto Tecnológico Sitio Uno**.

## 🎯 Objetivo
Proveer un esquema relacional robusto y normalizado que soporte el modelo de **Control de Acceso Basado en Roles (RBAC)** y gestione de forma íntegra el ciclo de vida del estudiante, desde la autenticación hasta la solvencia financiera y el historial académico.

## 🛠️ Funcionalidad por Módulos

El diseño se divide en cuatro dominios críticos reflejados en el archivo `itsu_backup.sql`:

1.  **Identidad y Acceso (`usuarios`):** Centraliza las credenciales y el rol del sistema (`estudiante`, `profesor`, `admin`). Utiliza `password_digest` para compatibilidad con BCrypt.
2.  **Gestión Académica (`periodos_lectivos`, `asignaturas`, `secciones`):** Estructura la oferta educativa. Las `secciones` incluyen un campo `jsonb` para los horarios, permitiendo flexibilidad en la programación.
3.  **Control de Matrícula (`estudiantes`, `inscripciones`):** Vincula a los usuarios con su récord académico. La tabla `inscripciones` gestiona notas finales e inasistencias.
4.  **Capa Financiera (`aranceles`, `facturas`, `transacciones_pagos`):** Maneja la economía del instituto en centavos (para evitar errores de redondeo) y soporta múltiples métodos de pago y estados de factura.

## 🚀 Guía de Instalación Paso a Paso

Sigue estos pasos para replicar el entorno de datos en tu máquina local:

### 1. Requisitos Previos
- Tener instalado **PostgreSQL 16** o superior.
- Asegurarte de que los binarios de Postgres (como `psql`) estén en tu variable de entorno PATH.

### 2. Descarga y Preparación
Si ya tienes el repositorio, ubica el archivo de respaldo en la raíz:
`c:\Users\Usuario\Desktop\itsu_backup.sql`

### 3. Ejecución del Script
El script de respaldo está configurado para crear la base de datos automáticamente. Abre una terminal (CMD o PowerShell) y ejecuta:

```bash
# Conéctate como superusuario (usualmente 'postgres') para ejecutar el script
psql -U postgres -f "c:\Users\Usuario\Desktop\flask apis\itsu_backup.sql"
```

*Nota: Si se te solicita contraseña, ingresa la de tu usuario de base de datos local.*

### 4. Verificación
Una vez finalizado, puedes entrar a la consola de postgres y verificar las tablas:
```sql
\c itsu_db
\dt
```

## 🛡️ Integridad de Datos
- **UUIDs:** Utilizamos `gen_random_uuid()` para los identificadores principales, aumentando la seguridad y evitando la enumeración de recursos en la API.
- **Borrado en Cascada:** Las llaves foráneas están configuradas con `ON DELETE CASCADE` para mantener la limpieza referencial al eliminar usuarios o periodos.
- **Índices B-Tree:** Se han creado índices específicos en `usuario_id` y `estudiante_id` para optimizar las consultas de búsqueda frecuentes en el sistema RBAC.

## 📈 Futuros Pasos para la Integración

Para evolucionar esta base de datos hacia el entorno de producción definido en nuestra planificación:

1.  **Migración a Sequel (Ruby):** Convertir este dump de SQL en archivos de migración de Ruby (`db/migrations`) para permitir un control de versiones de la estructura.
2.  **Módulo de Materiales:** Crear la tabla `recursos_didacticos` para gestionar los metadatos de archivos multimedia que se subirán al servidor.
3.  **Triggers de Auditoría:** Implementar disparadores (triggers) que registren cualquier cambio en las notas finales dentro de una tabla de log para auditorías administrativas.
4.  **Vistas de Rendimiento:** Crear vistas SQL que calculen el índice académico en tiempo real sin sobrecargar los servicios de Ruby.

---
**Mantenido por:** Equipo de Ingeniería ITSU  
**Última Actualización:** Junio 2026
```

### ¿Por qué este documento es importante?
1.  **Cumple con SOLID:** Al documentar el esquema, facilitas el principio de **Responsabilidad Única**, separando la explicación de la data de la lógica del código.
2.  **Facilita el TDD:** Al tener claros los campos y tipos de datos, es más fácil escribir los tests de integración en el backend de Ruby.
3.  **Guía para el Front-end:** Los desarrolladores de React podrán consultar este `.md` para saber exactamente qué campos esperar en los JSON (como `monto_total_centavos` o `jsonb` para horarios).

¿Te gustaría que cree el comando de migración inicial en Ruby para convertir alguna de estas tablas al formato de **Sequel**?

<!--
[PROMPT_SUGGESTION]Crea el archivo de migración de Sequel en Ruby para la tabla de 'usuarios' y 'estudiantes' basándote en el SQL[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Diseña un diagrama de entidad-relación (ERD) en formato Mermaid para incluirlo en este README_DATABASE.md[/PROMPT_SUGGESTION]