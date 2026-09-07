CoderHouse - Backend

API REST desarrollada con Node.js y Express para gestionar servicios.

🚀 Instalación

Clonar el repositorio:

git clone https://github.com/MartinfMelendez/CoderHouse-BackEnd.git

Ingresar al proyecto:

cd CoderHouse-BackEnd

Instalar las dependencias:

npm install

Crear el archivo .env tomando como referencia .env.example.

Luego iniciar el servidor:

npm start

El servidor estará disponible en:

http://localhost:8080

El puerto puede variar según la configuración del archivo .env.

📌 Endpoints

La API utiliza como ruta base:

/api/services
1. Obtener todos los servicios

GET

GET http://localhost:8080/api/services

Devuelve todos los servicios registrados.

2. Obtener un servicio por ID

GET

GET http://localhost:8080/api/services/:id

Ejemplo:

GET http://localhost:8080/api/services/1

Reemplazar 1 por el ID del servicio que se quiera consultar.

3. Crear un nuevo servicio

POST

POST http://localhost:8080/api/services

Enviar un JSON en el Body:

{
    "name": "Servicio de prueba",
    "description": "Descripción del servicio",
    "duration": 60,
    "price": 15000,
    "category": "General",
    "available": true
}
4. Actualizar un servicio

PUT

PUT http://localhost:8080/api/services/:id

Ejemplo:

PUT http://localhost:8080/api/services/1

Body:

{
    "name": "Servicio actualizado",
    "description": "Nueva descripción",
    "duration": 90,
    "price": 20000,
    "category": "General",
    "available": true
}
5. Eliminar un servicio

DELETE

DELETE http://localhost:8080/api/services/:id

Ejemplo:

DELETE http://localhost:8080/api/services/1

Reemplazar 1 por el ID del servicio que se quiera eliminar.