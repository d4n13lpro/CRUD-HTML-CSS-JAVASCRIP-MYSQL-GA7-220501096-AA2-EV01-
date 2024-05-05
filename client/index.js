// Este evento se dispara cuando el documento HTML ha sido completamente cargado y analizado.
document.addEventListener("DOMContentLoaded", function () {
  // Realiza una solicitud a la API en 'http://localhost:5000/getAll'
  fetch("http://localhost:5000/getAll")
    // Una vez que la respuesta es recibida, la convierte de formato JSON a un objeto JavaScript
    .then((response) => response.json())
    // Luego, con los datos recibidos, llama a la función 'loadHTMLTable'
    .then((data) => {
        console.log(data['data']); // Imprime los datos en la consola
        loadHTMLTable(data["data"]); // Llama a la función 'loadHTMLTable' con los datos recibidos
      });
}
);

// Selecciona el cuerpo de la tabla en el documento
document.querySelector("table tbody")
  // Agrega un escuchador de eventos al cuerpo de la tabla
  .addEventListener("click", function (event) {
    // Si el elemento clickeado tiene la clase 'delete-row-btn'
    if (event.target.className === "delete-row-btn") {
      // Llama a la función 'deleteRowById' con el id del elemento como parámetro
      deleteRowById(event.target.dataset.id);
    }
    // Si el elemento clickeado tiene la clase 'edit-row-btn'
    if (event.target.className === "edit-row-btn") {
      // Llama a la función 'handleEditRow' con el id del elemento como parámetro
      handleEditRow(event.target.dataset.id);
    }
  });

const updateBtn = document.querySelector("#update-row-btn");
const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = function () {
  const searchValue = document.querySelector("#search-input").value;

  // Validar que el campo de búsqueda no esté vacío
  if (!searchValue) {
    alert("Por favor, introduce un valor de búsqueda.");
    return;
  }

  fetch("http://localhost:5000/search/" + searchValue)
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
};

function deleteRowById(id) {
  fetch("http://localhost:5000/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}

function handleEditRow(id) {
  const updateSection = document.querySelector("#update-row");
  updateSection.hidden = false;
  document.querySelector("#update-name-input").dataset.id = id;
}

updateBtn.onclick = function () {
  const updateNameInput = document.querySelector("#update-name-input");

  // Validar que el campo de actualización no esté vacío
  if (!updateNameInput.value) {
    alert("Por favor, introduce un nombre para actualizar.");
    return;
  }

  fetch("http://localhost:5000/update", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: updateNameInput.dataset.id,
      name: updateNameInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};

const addBtn = document.querySelector("#add-name-btn");

addBtn.onclick = function () {
  const nameInput = document.querySelector("#name-input");
  const name = nameInput.value;

  // Validar que el campo de nombre no esté vacío
  if (!name) {
    alert("Por favor, introduce un nombre.");
    return;
  }

  nameInput.value = "";

  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: name }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]));
};

function insertRowIntoTable(data) {
  const table = document.querySelector("table tbody");
  const isTableData = table.querySelector(".no-data");

  let tableHtml = "<tr>";

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "dateAdded") {
        data[key] = new Date(data[key]).toLocaleString();
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }

  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

  tableHtml += "</tr>";

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }

  let tableHtml = "";

  data.forEach(function ({ id, name, date_added }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Eliminar</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Editar</td>`;
    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}
