CoderHouse BackEnd

API REST desarrollada con Node.js y Express como parte del curso de Backend de Coderhouse.

El proyecto implementa un CRUD para la gestión de servicios, utilizando actualmente un array en memoria como fuente de datos.

Tecnologías utilizadas
Node.js
Express
JavaScript
dotenv
Descripción del recurso

El recurso principal de la API es Service (Servicio).

Cada servicio contiene los siguientes campos:

Campo	Tipo	Descripción
id	Number	Identificador único del servicio
name	String	Nombre del servicio
description	String	Descripción del servicio
duration	Number	Duración del servicio en minutos
price	Number	Precio del servicio
category	String	Categoría a la que pertenece
available	Boolean	Indica si el servicio está disponible
Ejemplo de un servicio
{
  "id": 1,
  "name": "Corte de cabello",
  "description": "Corte de cabello clásico o moderno.",
  "duration": 45,
  "price": 8500,
  "category": "Belleza",
  "available": true
}

Instalación

Para ejecutar el proyecto localmente es necesario tener instalado Node.js.

1. Clonar el repositorio
git clone https://github.com/MartinfMelendez/CoderHouse-BackEnd.git

2. Ingresar al proyecto
cd CoderHouse-BackEnd

3. Instalar las dependencias
npm install

4. Configurar las variables de entorno

Crear un archivo .env en la raíz del proyecto.

El proyecto utiliza la variable de entorno PORT para definir el puerto en el que se ejecutará el servidor.

Ejemplo:

PORT=8080

5. Ejecutar el servidor
npm run dev


El servidor estará disponible en:

http://localhost:8080


Si se utiliza otro valor para PORT, se deberá utilizar ese puerto en las peticiones.

Variables de entorno

Actualmente el proyecto utiliza la siguiente variable de entorno:

Variable	Descripción	Ejemplo
PORT	Puerto en el que se ejecutará el servidor	8080

Ejemplo del archivo .env:

PORT=8080


Endpoints

La API utiliza el recurso:

/api/services

Método	Endpoint	Descripción
GET	/api/services	Obtener todos los servicios
GET	/api/services/:id	Obtener un servicio por ID
POST	/api/services	Crear un nuevo servicio
PUT	/api/services/:id	Actualizar un servicio
DELETE	/api/services/:id	Eliminar un servicio
GET - Obtener todos los servicios
Request
GET /api/services

Response
{
  "Services": [
    {
      "id": 1,
      "name": "Corte de cabello",
      "description": "Corte de cabello clásico o moderno.",
      "duration": 45,
      "price": 8500,
      "category": "Belleza",
      "available": true
    },
    {
      "id": 2,
      "name": "Masaje relajante",
      "description": "Masaje corporal para aliviar tensión y estrés.",
      "duration": 60,
      "price": 15000,
      "category": "Bienestar",
      "available": true
    }
  ]
}

GET - Obtener un servicio por ID
Request
GET /api/services/1

Response
{
  "Service": {
    "id": 1,
    "name": "Corte de cabello",
    "description": "Corte de cabello clásico o moderno.",
    "duration": 45,
    "price": 8500,
    "category": "Belleza",
    "available": true
  }
}


Si el servicio no existe, la API devuelve el mensaje:

Servicio no encontrado

POST - Crear un servicio
Request
POST /api/services
Content-Type: application/json

Body
{
  "name": "Clase de guitarra",
  "description": "Clase particular de guitarra para principiantes.",
  "duration": 60,
  "price": 10000,
  "category": "Música",
  "available": true
}

Response
{
  "NewService": {
    "id": 11,
    "name": "Clase de guitarra",
    "description": "Clase particular de guitarra para principiantes.",
    "duration": 60,
    "price": 10000,
    "category": "Música",
    "available": true
  }
}


El id se genera automáticamente.

Validaciones

Para crear un servicio se deben enviar los campos correspondientes al recurso.

Actualmente se valida que:

name esté presente.
description esté presente.
duration esté presente.
price esté presente y sea un número positivo.
category esté presente.
available esté presente.

Un valor de 0 para duration es considerado un valor presente porque se utiliza una validación mediante === undefined. En el caso de price, actualmente se requiere un valor mayor que 0.

PUT - Actualizar un servicio
Request
PUT /api/services/1
Content-Type: application/json


La actualización permite enviar únicamente los campos que se desean modificar.

Por ejemplo:

{
  "name": "Corte premium"
}


Los demás campos del servicio se conservan.

Ejemplo de actualización parcial

Servicio original:

{
  "id": 1,
  "name": "Corte de cabello",
  "description": "Corte de cabello clásico o moderno.",
  "duration": 45,
  "price": 8500,
  "category": "Belleza",
  "available": true
}


Petición:

{
  "name": "Corte premium"
}


Resultado:

{
  "id": 1,
  "name": "Corte premium",
  "description": "Corte de cabello clásico o moderno.",
  "duration": 45,
  "price": 8500,
  "category": "Belleza",
  "available": true
}


La actualización se realiza conservando el objeto existente y sobrescribiendo únicamente las propiedades recibidas:

services[index] = {
  ...services[index],
  ...data
}


Actualizar varios campos

También se pueden modificar varios campos en una misma petición:

{
  "name": "Corte premium",
  "price": 12000,
  "available": false
}


El resto de las propiedades conserva su valor anterior.

Nota: aunque conceptualmente una actualización parcial suele asociarse al método PATCH, en este proyecto se utiliza PUT para realizar la actualización de los campos enviados.

DELETE - Eliminar un servicio
Request
DELETE /api/services/1

Response
{
  "DeletedService": {
    "id": 1,
    "name": "Corte de cabello",
    "description": "Corte de cabello clásico o moderno.",
    "duration": 45,
    "price": 8500,
    "category": "Belleza",
    "available": true
  }
}


Si el servicio no existe:

Servicio no encontrado

Ejemplos con cURL
Obtener todos los servicios
curl http://localhost:8080/api/services

Obtener un servicio
curl http://localhost:8080/api/services/1

Crear un servicio
curl -X POST http://localhost:8080/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Clase de guitarra",
    "description": "Clase particular de guitarra para principiantes.",
    "duration": 60,
    "price": 10000,
    "category": "Música",
    "available": true
  }'

Actualizar un servicio
curl -X PUT http://localhost:8080/api/services/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Corte premium",
    "price": 12000,
    "available": false
  }'

Eliminar un servicio
curl -X DELETE http://localhost:8080/api/services/1

La utilización de un array permite implementar y probar las operaciones CRUD antes de incorporar una base de datos persistente.

Estructura del proyecto
CoderHouse-BackEnd/
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── managers/
│   │   └── ServiceManager.js
│   │
│   └── app.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

Principales archivos
src/app.js: configuración del servidor Express y definición de los endpoints.
src/managers/ServiceManager.js: contiene el array de servicios, la clase Service y la lógica CRUD.
src/config/env.config.js: configuración de las variables de entorno.
.env.example: ejemplo de las variables de entorno necesarias.
package.json: dependencias y scripts del proyecto.
Scripts disponibles
Desarrollo
npm run dev


Ejecuta el servidor en modo desarrollo.

Autor

Martin F. Melendez

Proyecto realizado para el curso de Backend de Coderhouse.