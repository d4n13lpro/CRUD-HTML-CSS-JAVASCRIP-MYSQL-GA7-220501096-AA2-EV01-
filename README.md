### 1 Antes de Iniciar se deben instalar las de pendencias de node.js
### 2 En la carpeta server ejecutar 
#### npm init -y
#### npm install express mysql dotenv cors
#### npm install nodemon --save-dev dotenv
### 3 En el archivo .env ingresar los datos: port,user,password,database,bd_port,host
### 4 En el archivo package.json en la seccion de scripts adicionar "start":"nodemon app.js"
### 5 En la carpeta server  abrir la consola y ejecutar: npm start  // para que inicie el servidor
### 6 Recordar que se debe crear la base de datos en mysql
### 7 Comprobar la conexion


### 2.3 Aplicación

#### 2.3.1 Estructura de Archivos

##### 2.3.1.1 Client
- **index.html:** Este archivo define la estructura HTML de la aplicación web. Contiene elementos como campos de entrada para nombres, botones para agregar, buscar, editar y eliminar registros, así como una tabla para mostrar los datos.
- **index.js:** Es el archivo JavaScript principal del lado del cliente. Se encarga de manejar la interacción del usuario y las solicitudes al servidor a través de la API REST.
- **style.css:** Este archivo contiene estilos CSS para personalizar la apariencia de la aplicación web.

##### 2.3.1.2 Server
- **.env:** Archivo de configuración que contiene variables de entorno para la configuración del servidor y la base de datos.
- **app.js:** Archivo principal del servidor. Define las rutas y endpoints de la API REST, maneja las solicitudes HTTP y las redirige a las funciones correspondientes.
- **dbService.js:** Contiene la lógica para interactuar con la base de datos MySQL. Define métodos para realizar operaciones CRUD (Create, Read, Update, Delete) en la tabla de nombres.
- **package-lock.json:** Archivo generado por npm para mantener un registro de las versiones exactas de las dependencias instaladas.
- **package.json:** Archivo que describe el proyecto Node.js y sus dependencias.

#### 2.3.2 Funcionalidades

##### 2.3.2.1 Módulos
- En la carpeta client, los archivos index.html, index.js y style.css forman un módulo que define la interfaz de usuario y la lógica del lado del cliente.
- En la carpeta server, los archivos app.js y dbService.js forman otro módulo que maneja la lógica del servidor y la interacción con la base de datos.
- Se utilizan los siguientes módulos npm:
  - Express: Framework web de Node.js utilizado para crear el servidor y definir rutas y endpoints de la API REST.
  - Cors: Middleware de Express que permite solicitudes entre dominios diferentes (CORS), facilitando la comunicación entre el cliente y el servidor.
  - Dotenv: Paquete que carga variables de entorno desde el archivo .env, lo que proporciona una forma segura de configurar variables de configuración sensibles.
  - Mysql: Paquete que proporciona una interfaz para interactuar con una base de datos MySQL desde Node.js.

##### 2.3.2.2 Variables
- Ejemplos de variables en JavaScript: `updateBtn`, `searchBtn`, `addBtn`, `nameInput`, `updateNameInput`, etc.

##### 2.3.2.3 Métodos
- Ejemplos de métodos en JavaScript: `fetch()`, `addEventListener()`, `onclick()`, etc.
- Métodos en dbService.js: `getAllData()`, `insertNewName(name)`, `deleteRowById(id)`, `updateNameById(id, name)`, `searchByName(name)`, etc.

##### 2.3.2.4 Clases
- La clase `DbService` en dbService.js encapsula la lógica para interactuar con la base de datos MySQL. Proporciona métodos para realizar operaciones CRUD.

##### 2.3.2.5 Paquetes
- En el archivo package.json, se especifican las dependencias del proyecto, como Express, Cors, Dotenv y Mysql.
- Se utiliza el paquete dotenv para cargar variables de entorno desde el archivo .env.
- Se utilizan los paquetes express y cors para crear un servidor y permitir solicitudes entre dominios diferentes (CORS).
- El paquete mysql proporciona una interfaz para interactuar con una base de datos MySQL desde Node.js.

##### 2.3.2.6 Manejo de Errores
- Se utiliza `try` y `catch` en los métodos asíncronos de dbService.js para manejar errores potenciales al interactuar con la base de datos, como errores de consulta, conexión o validación de datos.
- Los errores se registran en la consola para facilitar la depuración y se manejan de manera que la aplicación pueda continuar su ejecución de manera controlada.

#### 2.3.3 Interaction Front-end Back-end

La interacción entre el frontend y el backend en esta aplicación CRUD sigue un flujo típico de cliente-servidor a través de una API REST. Aquí está el proceso detallado:

##### 2.3.3.1 Interacción Cliente-Servidor

##### 2.3.3.2 Carga Inicial
- El cliente solicita la página web al servidor al cargar la URL en el navegador.
- El servidor responde con el archivo HTML (index.html) que contiene la estructura inicial de la página, junto con los archivos de estilo (style.css) y scripts (index.js).
- El navegador del cliente renderiza la página y ejecuta los scripts.

##### 2.3.3.3 Interacción del Usuario
-

 El usuario interactúa con la página web, por ejemplo, ingresando un nombre y haciendo clic en el botón "Agregar nombre".
- El script index.js maneja eventos como clics de botones y envía solicitudes HTTP al servidor utilizando la API Fetch.

##### 2.3.3.4 Solicitudes al Servidor
- Cuando el usuario hace clic en el botón "Agregar nombre", se envía una solicitud HTTP POST al servidor para agregar un nuevo nombre a la base de datos.
- Cuando el usuario realiza una búsqueda, se envía una solicitud HTTP GET al servidor para buscar nombres que coincidan con el término de búsqueda.
- Cuando el usuario desea actualizar o eliminar un nombre, se envían solicitudes HTTP PATCH o DELETE al servidor con los datos pertinentes.

##### 2.3.3.5 Procesamiento en el Servidor
- El servidor recibe las solicitudes y las dirige a las rutas y endpoints correspondientes definidos en app.js.
- Las rutas llaman a los métodos apropiados en dbService.js para realizar operaciones CRUD en la base de datos.

##### 2.3.3.6 Respuestas del Servidor
- El servidor procesa las solicitudes, interactúa con la base de datos según sea necesario y devuelve una respuesta al cliente.
- Las respuestas pueden incluir datos recuperados de la base de datos o mensajes de éxito/error.

##### 2.3.3.7 Actualización del Cliente
- Una vez que el cliente recibe la respuesta del servidor, puede actualizar la interfaz de usuario según sea necesario.
- Por ejemplo, si se agrega un nuevo nombre con éxito, la tabla se actualiza para mostrar el nuevo nombre. Si hay un error, se puede mostrar un mensaje de error al usuario.

#### 2.3.4 Interacción entre Archivos con Ejemplo de Módulo "Agregar Nombre"

##### 2.3.4.1 Cliente (Frontend)
- El usuario ingresa un nombre en el campo de entrada y hace clic en el botón "Agregar nombre".
- El evento click del botón está vinculado a una función en index.js.
- En la función de manejo del evento, se recupera el valor del campo de entrada y se envía una solicitud POST al servidor usando Fetch.
- Se espera una respuesta del servidor, que puede incluir los datos del nuevo nombre agregado.

##### 2.3.4.2 Servidor (Backend)
- El servidor recibe la solicitud POST en la ruta /insert y extrae el nombre del cuerpo de la solicitud.
- Utiliza el módulo dbService para insertar el nuevo nombre en la base de datos.
- El dbService interactúa con la base de datos MySQL, ejecutando la consulta de inserción y devolviendo el ID del nuevo registro insertado.

##### 2.3.4.3 Respuesta al Cliente
- El servidor responde con los datos del nuevo nombre insertado, que pueden incluir el ID generado por la base de datos.
- El cliente recibe la respuesta y actualiza la interfaz de usuario según sea necesario para reflejar el nuevo nombre agregado.

#### 2.3.5 Modelo Vista Controlador (M.V.C)

En la estructura proporcionada, la aplicación parece seguir un patrón de diseño similar al Modelo-Vista-Controlador (MVC) o una variante de él. Aunque no se implementa explícitamente con clases dedicadas a cada componente, se pueden identificar elementos que cumplen funciones similares a las de un MVC:

##### 2.3.5.1 Modelo (Model)
- En este caso, el archivo dbService.js en el directorio server actúa como el modelo. Este archivo contiene las consultas a la base de datos y métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los datos. Es responsable de interactuar directamente con la base de datos y manejar la lógica de los datos.

##### 2.3.5.2 Vista (View)
- La vista se representa principalmente por el archivo index.html y los estilos en style.css en el directorio client. Estos archivos definen la estructura y la apariencia de la interfaz de usuario que el usuario final ve y con la que interactúa. La manipulación del DOM en el archivo index.js también contribuye a la representación visual de los datos en la página web.

##### 2.3.5.3 Controlador (Controller)
- El controlador generalmente es el archivo app.js en el directorio server. Este archivo define las rutas y los controladores de cada ruta para manejar las solicitudes HTTP entrantes. Los controladores se encargan de procesar la entrada del usuario, interactuar con el modelo para realizar operaciones en los datos y finalmente enviar una respuesta al usuario, que puede ser datos o una nueva vista.

#### 2.3.6 ENDPOINTS

Los endpoints son puntos finales específicos de una API que definen cómo los clientes pueden interactuar con la aplicación a través de solicitudes HTTP. En el contexto de esta aplicación CRUD, los endpoints representan las operaciones CRUD básicas (Crear, Leer, Actualizar, Eliminar) que se pueden realizar en los datos almacenados en la base de datos.

- **/insert:** Permite agregar nuevos datos a la base de datos. Es un punto final de tipo POST que espera recibir un objeto JSON con la información necesaria para crear una nueva entrada en la base de datos.
- **/getAll:** Recupera todos los datos almacenados en la base de datos. Es un punto final de tipo GET que devuelve todos los registros presentes en la base de datos.
- **/update:** Actualiza un registro existente en la base de datos. Es un punto final de tipo PATCH que espera recibir el ID del registro a actualizar y los nuevos datos que se deben aplicar.
- **/delete/:id:** Elimina un registro específico de la base de datos. Es un punto final de tipo DELETE que espera recibir el ID del registro que se debe eliminar como parte de la URL.
- **/search/:name:** Busca registros en la base de datos que coincidan con un nombre específico. Es un punto final de tipo GET que espera recibir un parámetro de consulta que indique el nombre a buscar.

```https://www.youtube.com/watch?v=vrj9AohVhPA```

