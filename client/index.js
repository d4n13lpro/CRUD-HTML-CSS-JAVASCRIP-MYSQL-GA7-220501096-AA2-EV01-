// Cuando el contenido del documento HTML ha sido completamente cargado y analizado, se ejecuta esta función
document.addEventListener('DOMContentLoaded', function () {
    // Se realiza una solicitud HTTP GET al servidor para obtener todos los datos de la tabla
    fetch('http://localhost:5000/getAll')
    .then(response => response.json()) // Se convierte la respuesta a JSON
    .then(data => loadHTMLTable(data['data'])); // Se llama a la función loadHTMLTable para cargar los datos en la tabla HTML
  });
  
  // Se agrega un evento 'click' a la tabla para manejar los clics en los botones de edición y eliminación de filas
  document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        // Si se hace clic en el botón de eliminar, se llama a la función deleteRowById para eliminar la fila correspondiente
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        // Si se hace clic en el botón de editar, se llama a la función handleEditRow para manejar la edición de la fila correspondiente
        handleEditRow(event.target.dataset.id);
    }
  });
  
  // Seleccionar los botones de búsqueda y actualización
  const updateBtn = document.querySelector('#update-row-btn');
  const searchBtn = document.querySelector('#search-btn');
  
  // Evento 'click' para el botón de búsqueda
  searchBtn.onclick = function() {
    // Obtener el valor del campo de búsqueda
    const searchValue = document.querySelector('#search-input').value;
  
    // Realizar una solicitud HTTP GET al servidor con el valor de búsqueda
    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => loadHTMLTable(data['data'])); // Llamar a la función loadHTMLTable para cargar los datos en la tabla HTML
  }
  
  // Función para eliminar una fila por su ID
  function deleteRowById(id) {
    // Realizar una solicitud HTTP DELETE al servidor para eliminar la fila correspondiente
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        if (data.success) {
            // Si la eliminación fue exitosa, recargar la página
            location.reload();
        }
    });
  }
  
  // Función para manejar la edición de una fila por su ID
  function handleEditRow(id) {
    // Mostrar la sección de actualización y asignar el ID a un campo oculto
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
  }
  
  // Evento 'click' para el botón de actualización
  updateBtn.onclick = function() {
    // Obtener el valor del campo de actualización
    const updateNameInput = document.querySelector('#update-name-input');
  
    // Realizar una solicitud HTTP PATCH al servidor para actualizar el nombre
    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        if (data.success) {
            // Si la actualización fue exitosa, recargar la página
            location.reload();
        }
    })
  }
  
  // Evento 'click' para el botón de agregar nombre
  const addBtn = document.querySelector('#add-name-btn');
  
  addBtn.onclick = function () {
    // Obtener el valor del campo de entrada de nombre
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";
  
    // Realizar una solicitud HTTP POST al servidor para agregar el nuevo nombre
    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name})
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => insertRowIntoTable(data['data'])); // Llamar a la función insertRowIntoTable para insertar la nueva fila en la tabla HTML
  }
  
  // Función para insertar una fila en la tabla HTML
  function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');
  
    let tableHtml = "<tr>";
  
    // Iterar sobre los datos y construir las celdas de la fila
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                // Formatear la fecha
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }
  
    // Agregar botones de edición y eliminación a la fila
    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
  
    tableHtml += "</tr>";
  
    // Insertar la fila en la tabla
    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
  }
  
  // Función para cargar los datos en la tabla HTML
  function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
  
    // Si no hay datos, mostrar un mensaje
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }
  
    let tableHtml = "";
  
    // Iterar sobre los datos y construir las filas de la tabla
    data.forEach(function ({id, name, date_added}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });
  
    // Insertar las filas en la tabla
    table.innerHTML = tableHtml;
  }
  