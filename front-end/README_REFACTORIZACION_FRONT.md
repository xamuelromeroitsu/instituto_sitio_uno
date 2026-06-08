# Metodología para el Front-end de ITS

## 📌 Objetivo
Este documento describe la metodología para diseñar, desarrollar y mantener el front-end de la página de ITS. El propósito es garantizar una aplicación sólida, escalable y alineada con el modelo de control de acceso basado en roles (RBAC) que utiliza el back-end en Ruby.

## 🧭 Principios generales

- **Separación de responsabilidades**: la interfaz se encarga de la experiencia de usuario, el back-end gestiona la lógica de negocio y la seguridad.
- **Consistencia visual y funcional**: usar estilos, componentes y patrones únicos para cada dominio del sistema.
- **Acceso condicional**: ocultar o mostrar rutas, botones y contenidos en función del rol y permisos del usuario.
- **Validación temprana**: validar formularios y datos en la UI antes de enviarlos al servidor.
- **Performance y accesibilidad**: optimizar recursos, reducir cargas innecesarias y asegurar usabilidad para todos.

## 🔐 Control de acceso en el front-end

El front-end debe consumir la información de roles y permisos desde el servidor y aplicar controles de forma nativa en la interfaz.

- Cargar el perfil del usuario tras la autenticación.
- Guardar el token JWT y el payload (roles/permissions) en un almacén seguro del cliente.
- Renderizar menús y rutas solo para acciones permitidas.
- Proteger rutas con guardias que bloqueen la navegación cuando no haya acceso.
- Mostrar mensajes claros cuando el usuario intenta acceder a una sección restringida.

## 🧩 Módulos y su impacto en la UI

| Módulo | Rol principal en Front-end | Comportamiento esperado | Notas clave |
| :--- | :--- | :--- | :--- |
| **Autenticación** | Login, logout, recuperación de sesión | Formularios seguros, control de estados, redirecciones | Integrar con JWT y validación de expiración |
| **Estudiantes** | Panel de alumno, historial académico, avance | Tablas de progreso, filtros por carrera, vista personalizada | Peticiones CRUD y componentes reutilizables |
| **Académico** | Gestión de asignaturas, horarios y evaluaciones | Formularios dinámicos, validación de arrays, estados de lapso | Validar entradas antes de enviar al API |
| **Materiales** | Biblioteca de documentos y recursos | Listados, descargas, vista previa | Subida de archivos y control de visibilidad |
| **Finanzas** | Estado de pagos y recibos | Dashboard de pagos, alertas de bloqueos | Integración con webhook/estado de transacciones |
| **Administración** | Panel global y auditoría | Reportes, métricas y control total | Mostrar solo para roles administrativos |

## 🛠️ Estrategia de desarrollo

1. **Inicio por estructuras de datos**
   - Definir los modelos de frontend basados en los endpoints de Ruby.
   - Mapear atributos y permisos necesarios para cada vista.

2. **Diseño de navegación segura**
   - Crear rutas protegidas y rutas públicas.
   - Implementar guardias de acceso centralizados.

3. **Componentes reutilizables**
   - Botones, tablas, tarjetas, modales y formularios.
   - Componentes adaptativos según rol y estado.

4. **Validación y feedback inmediato**
   - Validar datos en formularios antes de enviar.
   - Mostrar errores y estados de carga claros.

5. **Integración con servicios**
   - Conectar endpoints de autenticación, estudiantes, académico, materiales, finanzas y administración.
   - Manejar errores del servidor y sesiones caducadas.

6. **Pruebas y QA**
   - Probar rutas protegidas con usuarios de cada rol.
   - Validar que la UI no exponga funciones de forma indebida.
   - Verificar consistencia entre permisos del token y la UI mostrada.

## 🧪 Validación de seguridad en la UI

El front-end no sustituye la seguridad del servidor, pero debe actuar como primera barrera:

- No confiar en valores enviados desde el cliente.
- No renderizar botones ni acciones si el usuario no está autorizado.
- Redireccionar a una página de acceso denegado cuando se intente ingresar a un módulo restringido.
- Mantener la autenticación activa y renovar tokens con cuidado.

## 📐 Guía para la estructura del proyecto

- `components/` – UI reutilizable y atómica.
- `js/components/` – componentes JS reutilizables como la navegación responsive.
- `js/services/` – datos estáticos y consumo de APIs.
- `js/views/` – lógica de página por HTML, separada y clara.
- `views/` o `pages/` – cada dominio principal del sistema.
- `stores/` o `context/` – estado global y permisos del usuario.
- `utils/` – funciones de validación, formateo y helpers.
- `assets/` – imágenes, estilos y recursos compartidos.

## 🚀 Buenas prácticas específicas

- Usar un layout base para evitar duplicación de encabezados/navegación.
- Separar lógica de renderizado de la lógica de permiso.
- Implementar lazy loading en módulos pesados.
- Mantener un esquema de nombres claro para rutas y componentes.
- Documentar cada vista con su rol de acceso y permisos necesarios.

## ✅ Resumen

El front-end de ITS debe construirse con enfoque en:

- seguridad RBAC desde la UI,
- dominios funcionales claramente delimitados,
- validación temprana y experiencia de usuario, y
- colaboración estrecha con el back-end Ruby para no duplicar lógicas críticas.

Con esta metodología se garantiza que la interfaz no solo luzca bien, sino que funcione de manera segura y coherente con el modelo de negocio de la institución.
