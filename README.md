📘 Sistema de Colegio – Documentación del Proyecto
🏫 Descripción General

El Sistema de Colegio es una aplicación web diseñada para la gestión académica y administrativa de estudiantes, cursos y usuarios.
Incluye autenticación, controles de acceso, generación de reportes en PDF, estadísticas gráficas y un CRUD completo con eliminación lógica.

Este proyecto fue desarrollado usando:

Frontend: React

Backend: Node.js + Express

Base de Datos: MySQL

Autenticación: JWT + Captcha

Gráficos: Chart.js

PDF: jsPDF / pdfmake

📁 Características Principales
🔐 Autenticación y Seguridad

Login de usuarios con JWT.

CAPTCHA en el formulario de acceso.

Validación de contraseña (débil, media o fuerte).

Contraseñas encriptadas con bcrypt.

Control de permisos según rol (admin, docente, etc.)

📚 Gestión Académica (CRUD)

Registro, edición y eliminación lógica (soft delete) de:

Estudiantes

Cursos

Docentes

Usuarios del sistema

🧾 Reportes

Generación de reportes en PDF .

Reportes de estudiantes por curso, grado, paralelo etc.

📊 Estadísticas

Gráficos estadísticos dinámicos:

Cantidad de estudiantes por grado.

Cantidad de cursos activos.

Otros reportes académicos.

📝 Registro de Actividad (Logs)

Se registra:

Usuario

IP

Browser

Evento (Ingreso / Salida)

Fecha y hora

🧱 Tecnologías Utilizadas
Frontend

React

React Router

Axios

Chart.js

TailwindCSS / Bootstrap (según elección)

Backend

Node.js + Express

MySQL / Sequelize

bcrypt

jsonwebtoken (JWT)

cors

express-rate-limit (seguridad extra)

🚀 Instalación y Ejecución del Proyecto
🔧 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/sistema-colegio.git
cd sistema-colegio

🌐 2. Configurar el Backend
cd backend
npm install


Crear archivo .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=colegio
JWT_SECRET=tu_secreto
PORT=4000


Iniciar:

npm run dev

💻 3. Configurar el Frontend
cd frontend
npm install
npm start

📊 Estructura del Proyecto
sistema-colegio/
   ├── backend/
   │      ├── config/
   │      ├── controller/
   │      ├── models/
   │      ├── routes/
   │      ├── formulario.js
   │      └── index.js
   ├── frontend/
          └── public/imagenes
   │      ├── src/modules/curso/curso.jsx
   │      ├── src/modules/estudiante/estudiante.jsx
   │      ├── src/modules/inicio/inicio.jsx
   │      └── src/modules/reporte/reporte.jsx
          └── routes
          └── src
   └── README.md

🧪 Validaciones Implementadas
En el frontend:

Campos obligatorios.

Validación de email.

Fuerza de contraseña.

Longitud de textos.

En el backend:

Validación de datos antes de guardar.

Sanitización de inputs.

🔒 Eliminación Lógica

En vez de eliminar registros, se usa un campo:

estado: 1 = activo, 0 = eliminado


Esto permite recuperar información si es necesario.

👥 Equipo y Créditos

Integrantes del grupo:

Nombre Jhon Brayan Mamani Mamani 

☁️ Despliegue (Opcional)

Puedes alojar el proyecto en:

Vercel (frontend)

Render / Railway (backend)

🔗 Repositorio del Proyecto

()
