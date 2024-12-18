# e-commerce-pulguitas-backend

Bienvenido al repositorio del backend para **E-commerce Pulguitas**. Este proyecto es el motor del sistema, encargado de gestionar la lógica del negocio, la comunicación con la base de datos y la integración con servicios externos.

---

## 🌟 Características principales
- **Autenticación y autorización**: Uso de JSON Web Tokens (JWT) para gestionar el acceso seguro.
- **Base de datos relacional**: Integración con MySQL utilizando Sequelize ORM.
- **Procesamiento de archivos**: Manejo de imágenes y documentos con Multer y Sharp.
- **Pagos en línea**: Integración con Mercado Pago para gestionar pagos.
- **Validaciones**: Uso de Express Validator para garantizar la calidad de los datos recibidos.
- **Entorno seguro**: Uso de variables de entorno con dotenv.

---

## 🚀 Tecnologías utilizadas

### **Backend**
- [Express](https://expressjs.com/) - Framework para la construcción de APIs.
- [Sequelize](https://sequelize.org/) - ORM para bases de datos relacionales.
- [MySQL2](https://github.com/sidorares/node-mysql2) - Cliente para MySQL.
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - Encriptación de contraseñas.
- [JWT](https://jwt.io/) - JSON Web Tokens para autenticación.
- [Multer](https://github.com/expressjs/multer) - Subida de archivos.
- [Sharp](https://sharp.pixelplumbing.com/) - Procesamiento de imágenes.
- [Mercado Pago](https://www.mercadopago.com/) - Pasarela de pagos.

### **Herramientas de desarrollo**
- [Nodemon](https://nodemon.io/) - Reinicio automático del servidor durante el desarrollo.
- [Sequelize CLI](https://sequelize.org/master/manual/migrations.html) - Herramientas para migraciones y modelos.

---

## 🛠️ Instalación y uso

### **Requisitos previos**
- Node.js (v18 o superior)
- MySQL

### **Pasos para ejecutar el proyecto**
1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/e-commerce-pulguitas-backend.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd e-commerce-pulguitas-backend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno:
   Crea un archivo `.env` basado en el archivo `.env.example` y configura las credenciales de la base de datos y las claves necesarias.
5. Ejecuta las migraciones de la base de datos:
   ```bash
   npx sequelize-cli db:migrate
   ```
6. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

---

## 📁 Estructura del proyecto

```
├── config
├── controllers
├── middlewares
├── migrations
├── models
├── routes
├── utils
├── .env.example
├── app.js
└── package.json
```

---

## 🧑‍💻 Participantes del proyecto

- **Parodi, Lucas**
  - Product Manager / Desarrollador Full Stack / DevOps

- **Hamm, Abdul**
  - Desarrollador Backend / Tester QA / DevOps

---

## 🌟 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor crea un fork del repositorio, realiza tus cambios y envía un pull request. 

---

## 📄 Licencia
Este proyecto está bajo la Licencia ISC. Consulta el archivo LICENSE para más información.

---

¡Gracias por visitar nuestro proyecto! Esperamos que "Pulguitas" sea la solución ideal para tu negocio de pet shop. 🐾

