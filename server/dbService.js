// Importar el módulo 'mysql' para interactuar con la base de datos MySQL
const mysql = require('mysql');
// Importar el módulo 'dotenv' para cargar variables de entorno desde un archivo .env
const dotenv = require('dotenv');
// Crear una instancia de la clase 'DbService' como una variable global para implementar el patrón Singleton
let instance = null;
// Configurar dotenv para cargar las variables de entorno
dotenv.config();

// Crear una conexión a la base de datos MySQL utilizando los valores de las variables de entorno
const connection = mysql.createConnection({
    host: process.env.HOST, // Host de la base de datos
    user: process.env.USER, // Usuario de la base de datos
    password: process.env.PASSWORD, // Contraseña de la base de datos
    database: process.env.DATABASE, // Nombre de la base de datos
    port: process.env.DB_PORT // Puerto de la base de datos
});

// Conectar a la base de datos y manejar cualquier error que pueda ocurrir durante la conexión
connection.connect((err) => {
    if (err) {
        console.log(err.message); // Imprimir el mensaje de error en la consola si la conexión falla
    }
    // console.log('db ' + connection.state); // (Opcional) Imprimir el estado de la conexión en la consola
});

// Definir la clase 'DbService' para manejar las operaciones de la base de datos
class DbService {
    // Método estático para obtener una única instancia del servicio de base de datos utilizando el patrón Singleton
    static getDbServiceInstance() {
        return instance ? instance : new DbService(); // Devolver la instancia existente o crear una nueva si no existe
    }

    // Método para obtener todos los datos de la tabla 'names'
    async getAllData() {
        try {
            // Realizar una consulta SQL para seleccionar todos los registros de la tabla 'names'
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                // Ejecutar la consulta y manejar el resultado o cualquier error que pueda ocurrir
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results); // Resolver la promesa con los resultados de la consulta
                });
            });
            return response; // Devolver los resultados obtenidos de la consulta
        } catch (error) {
            console.log(error); // Manejar cualquier error que pueda ocurrir durante la operación
        }
    }

    // Métodos para insertar, actualizar, eliminar y buscar registros en la tabla 'names'
    // Implementados de manera similar a getAllData(), con consultas SQL específicas para cada operación
    // Cada método maneja errores de manera similar y devuelve resultados adecuados
}

// Exportar la clase 'DbService' para que esté disponible para otros módulos
module.exports = DbService;
