// Importar los módulos necesarios
const express = require('express');
const app = express(); // Crear una instancia de la aplicación Express
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
const dotenv = require('dotenv'); // Para cargar variables de entorno desde un archivo .env
dotenv.config(); // Configurar dotenv para cargar las variables de entorno

// Importar el servicio de base de datos
const dbService = require('./dbService');

// Configurar middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Middleware para analizar solicitudes con formato JSON
app.use(express.urlencoded({ extended : false })); // Middleware para analizar solicitudes con datos codificados en URL

// Endpoint para crear un nuevo registro
app.post('/insert', (request, response) => {
    const { name } = request.body; // Obtener el nombre del cuerpo de la solicitud
    const db = dbService.getDbServiceInstance(); // Obtener una instancia del servicio de base de datos
    
    // Insertar el nuevo nombre en la base de datos
    const result = db.insertNewName(name);

    // Manejar el resultado de la operación
    result
    .then(data => response.json({ data: data })) // Enviar los datos de vuelta como una respuesta JSON
    .catch(err => console.log(err)); // Manejar cualquier error que ocurra
});

// Endpoint para obtener todos los registros
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance(); // Obtener una instancia del servicio de base de datos

    // Obtener todos los datos de la base de datos
    const result = db.getAllData();
    
    // Manejar el resultado de la operación
    result
    .then(data => response.json({ data: data })) // Enviar los datos de vuelta como una respuesta JSON
    .catch(err => console.log(err)); // Manejar cualquier error que ocurra
});

// Endpoint para actualizar un registro existente
app.patch('/update', (request, response) => {
    const { id, name } = request.body; // Obtener el ID y el nuevo nombre del cuerpo de la solicitud
    const db = dbService.getDbServiceInstance(); // Obtener una instancia del servicio de base de datos

    // Actualizar el nombre en la base de datos por su ID
    const result = db.updateNameById(id, name);
    
    // Manejar el resultado de la operación
    result
    .then(data => response.json({ success: data })) // Enviar el resultado de vuelta como una respuesta JSON
    .catch(err => console.log(err)); // Manejar cualquier error que ocurra
});

// Endpoint para eliminar un registro por su ID
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params; // Obtener el ID de los parámetros de la URL
    const db = dbService.getDbServiceInstance(); // Obtener una instancia del servicio de base de datos

    // Eliminar la fila de la base de datos por su ID
    const result = db.deleteRowById(id);
    
    // Manejar el resultado de la operación
    result
    .then(data => response.json({ success: data })) // Enviar el resultado de vuelta como una respuesta JSON
    .catch(err => console.log(err)); // Manejar cualquier error que ocurra
});

// Endpoint para buscar registros por nombre
app.get('/search/:name', (request, response) => {
    const { name } = request.params; // Obtener el nombre de los parámetros de la URL
    const db = dbService.getDbServiceInstance(); // Obtener una instancia del servicio de base de datos

    // Buscar registros por nombre en la base de datos
    const result = db.searchByName(name);
    
    // Manejar el resultado de la operación
    result
    .then(data => response.json({ data: data })) // Enviar los datos de vuelta como una respuesta JSON
    .catch(err => console.log(err)); // Manejar cualquier error que ocurra
});

// Iniciar el servidor y escuchar en el puerto especificado en las variables de entorno
app.listen(process.env.PORT, () => console.log('app is running'));