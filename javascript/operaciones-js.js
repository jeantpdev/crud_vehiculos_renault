import config from '../supabase/keys.js';

// Cuando cargue la página, se llenará automaticamente la tabla con los registros de la base de datos
document.addEventListener('DOMContentLoaded', function () {

  const tablaPrincipalCuerpo = document.getElementById('tabla-principal-cuerpo');

  axios.get('https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?select=*', config)
    .then(function (response) {

      // response.data es el array que contiene la respuesta obtenida (response) y con forEach se itera en cada uno como si fuese un json
      response.data.forEach(datos => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${datos.id}</td>
          <td>${datos.modelo}</td>
          <td>${datos.año}</td>
          <td>${datos.kilometraje}</td>
          <td>${datos.precio}</td>
        `;
        tablaPrincipalCuerpo.appendChild(tr);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
})

/* MODAL INSERTAR */
var modalInsertar = document.getElementById("targetModalInsertar");
var btnAbrirModalInsertar = document.getElementById("btnAbrirModalInsertar");
var btnCerrarModalInsertar = document.getElementsByClassName("cerrar-modal-insertar")[0];
const btnInsertarDatosModal = document.getElementById('btnInsertarDatosModal');

btnAbrirModalInsertar.onclick = function () {
  modalInsertar.style.display = "block";
}

btnCerrarModalInsertar.onclick = function () {
  modalInsertar.style.display = "none";
  const campo_kilometraje = document.getElementById("kilometraje");
  const campo_precio = document.getElementById("precio");

  campo_kilometraje.value = "";
  campo_precio.value = ""
}

window.onclick = function (event) {
  if (event.target == modalInsertar) {
    modalInsertar.style.display = "none";
  }
}

/* MODAL MODIFICAR */
var modalModificar = document.getElementById("targetModalModificar");
var btnAbrirModalModificar = document.getElementById("btnAbrirModalModificar");
var btnCerrarModalModificar = document.getElementsByClassName("cerrar-modal-modificar")[0];
const btnModificarDatosModal = document.getElementById('btnModificarDatosModal');

btnAbrirModalModificar.onclick = function () {
  modalModificar.style.display = "block";

  const modificarId = document.getElementById('modificar-id');
  const modificarModelo = document.getElementById('modificarModelo');
  const modificarAño = document.getElementById('modificarAño');
  const modificarPrecios = document.getElementById('modificar-precio');
  const modificarKilometrajes = document.getElementById('modificar-kilometraje');
  const modificarPrecio = document.getElementById('modificar-precio');
  const modificarKilometraje = document.getElementById('modificar-kilometraje');

  modificarId.value = "";
  modificarModelo.value = "";
  modificarAño.value = "";
  modificarPrecios.value = "";
  modificarKilometrajes.value = "";

  modificarPrecio.disabled = true;
  modificarKilometraje.disabled = true;
  btnModificarDatosModal.disabled = true;
}

btnCerrarModalModificar.onclick = function () {
  modalModificar.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalModificar) {
    modalModificar.style.display = "none";
  }
}

/* MODAL Eliminar */
var modalEliminar = document.getElementById("targetModalEliminar");
var btnAbrirModalEliminar = document.getElementById("btnAbrirModalEliminar");
var btnCerrarModalEliminar = document.getElementsByClassName("cerrar-modal-eliminar")[0];
const btnEliminarDatosModal = document.getElementById('btnEliminarDatosModal');

btnAbrirModalEliminar.onclick = function () {
  modalEliminar.style.display = "block";
}

btnCerrarModalEliminar.onclick = function () {
  modalEliminar.style.display = "none";
  const eliminarId = document.getElementById('eliminar-id');
  eliminarId.value = "";
}

window.onclick = function (event) {
  if (event.target == modalEliminar) {
    modalEliminar.style.display = "none";
  }
}

/* MODAL Consultar */
var modalConsultar = document.getElementById("targetModalConsultar");
var btnAbrirModalConsultar = document.getElementById("btnAbrirModalConsultar");
var cerrarModalConsultar = document.getElementsByClassName("cerrar-modal-consultar")[0];
const btnConsultarDatosModal = document.getElementById('boton-consultar-registro');
const btnLimpiarCampoId = document.getElementById('btnLimpiarCampoId');
const modalConsultarCampoId = document.getElementById('modalConsultarCampoId');

btnAbrirModalConsultar.onclick = function () {
  modalConsultar.style.display = "block";
}

cerrarModalConsultar.onclick = function () {
  modalConsultar.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalConsultar) {
    modalConsultar.style.display = "none";
  }
}

btnLimpiarCampoId.onclick = function () {
  modalConsultarCampoId.value = "";
}
/* Funciones */
function insertar_datos_vehiculo() {
  const campo_modelo = document.getElementById('campo-modelo__combobox').value;
  const campo_año = document.getElementById('campo-year__combobox').value;
  const campo_kilometraje = document.getElementById("kilometraje").value;
  const campo_precio = document.getElementById("precio").value;
  let formato_precio = Intl.NumberFormat("de-DE");
  let formato_kilometraje = Intl.NumberFormat("de-DE");

  precio = formato_precio.format(campo_precio);
  kilometraje = formato_kilometraje.format(campo_kilometraje);


  const datos_insertar = {
    modelo: campo_modelo,
    año: campo_año,
    kilometraje: kilometraje + " km",
    precio: "$ " + precio
  }

  axios({
    method: "POST",
    url: "https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault",
    data: datos_insertar,
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI'
    }
  })
    .then(res =>
      console.log(res))
    .catch(err => console.log('Error:', err))
}

function modificar_datos_vehiculo() {
  const modificarId = document.getElementById('modificar-id').value;
  const modificarModelo = document.getElementById('modificarModelo').value;
  const modificarAño = document.getElementById('modificarAño').value;
  const modificarPrecio = document.getElementById('modificar-precio').value;
  const modificarKilometraje = document.getElementById('modificar-kilometraje').value;
  let formato_precio = Intl.NumberFormat("de-DE");
  let formato_kilometraje = Intl.NumberFormat("de-DE");

  if (modificarId == "" || modificarModelo == "" || modificarAño == "" || modificarPrecio == "" || modificarKilometraje == "") {
    alert("Asegurate que los campos no estén vacíos");
  } else {
    precio = formato_precio.format(modificarPrecio);
    kilometraje = formato_kilometraje.format(modificarKilometraje);

    const respuestas_preguntas = {
      modelo: modificarModelo,
      año: modificarAño,
      kilometraje: kilometraje + " km",
      precio: "$ " + precio
    }

    axios({
      method: "UPDATE",
      url: "https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?id=is." + modificarId,
      data: respuestas_preguntas,
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
        Prefer: 'return=minimal'
      }
    })
      .then(res =>
        console.log(res))
      .catch(err => console.log('Error:', err))
  }

}

function eliminar_datos_vehiculo() {
  const eliminarId = document.getElementById('eliminar-id').value;

  if (eliminarId == "") {
    alert("Asegurate que los campos no estén vacíos");
  } else {

    axios({
      method: 'DELETE',
      url: 'https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?id=eq.' + eliminarId,
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI'
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log('Error:', err))
  }

}

function buscar_datos_vehiculos() {
  const idBuscar = document.getElementById('modificar-id').value;
  let modificarModelo = document.getElementById('modificarModelo');
  let modificarAño = document.getElementById('modificarAño');
  let modificarPrecio = document.getElementById('modificar-precio');
  let modificarKilometraje = document.getElementById('modificar-kilometraje');

  axios({
    method: 'GET',
    url: 'https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?id=eq.' + idBuscar,
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI'
    }
  })
    .then(function (response) {

      precioFormateado = response.data[0].precio;

      const valorSinDolar = precioFormateado.replace("$", "");
      const precioFinal = Number(valorSinDolar.replace(/\./g, ""));

      kmFormateado = response.data[0].kilometraje;

      const valorSinKm = kmFormateado.replace("km", "")
      const kmFinal = Number(valorSinKm.replace(/\./g, ""));

      modificarAño.value = response.data[0].año;
      modificarModelo.value = response.data[0].modelo;
      modificarPrecio.value = precioFinal;
      modificarKilometraje.value = kmFinal;
    })
    .catch(function (error) {
      return error.code;
    });

}
const btnBuscarModificarDatosModal = document.getElementById('btnBuscarModificarDatosModal')

function consultar_datos_vehiculo() {

  const modalConsultarCampoId = document.getElementById('modalConsultarCampoId').value;
  const tbodyConsultar = document.getElementById('tablaCuerpoResultadosDatosVehiculo');

  if (modalConsultarCampoId == "") {
    alert("Asegurate que los campos no estén vacíos");
  } else {

    axios({
      method: 'GET',
      url: 'https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?id=eq.' + modalConsultarCampoId,
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI'
      }
    })
      .then(function (response) {

        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${response.data[0].id}</td>
        <td>${response.data[0].modelo}</td>
        <td>${response.data[0].año}</td>
        <td>${response.data[0].kilometraje}</td>
        <td>${response.data[0].precio}</td>
      `;
        tbodyConsultar.innerHTML = ''; // Elimina filas existentes
        tbodyConsultar.appendChild(tr);

      })
      .catch(function (error) {
        return error.code;
      });
  }

}

/* Botones */
btnInsertarDatosModal.onclick = function () {
  const campo_kilometraje = document.getElementById("kilometraje").value;
  const campo_precio = document.getElementById("precio").value;

  if (campo_kilometraje == "" || campo_precio == "") {
    alert("Asegurate que los campos no estén vacíos");
  } else {
    let text = "¿Estás seguro que deseas insertar este registro?";
    if (confirm(text) == true) {
      alert("Registro insertado");
      insertar_datos_vehiculo();
      modalInsertar.style.display = "none";
    } else {
      text = "You canceled!";
    }
  }
}

btnModificarDatosModal.onclick = function () {
  const modificarId = document.getElementById('modificar-id').value;
  const modificarPrecio = document.getElementById('modificar-precio').value;
  const modificarKilometraje = document.getElementById('modificar-kilometraje').value;

  if (modificarId == "" || modificarPrecio == "" || modificarKilometraje == "") {
    alert("Asegurate de rellenar todos los campos")
  } else {
    let text = "¿Estás seguro que deseas modificar este registro?";
    if (confirm(text) == true) {
      modificar_datos_vehiculo();
      alert("Registro modificado");
      modalModificar.style.display = "none";

    } else {
      text = "You canceled!";
    }
  }


}

btnBuscarModificarDatosModal.onclick = function () {

  const modificarId = document.getElementById('modificar-id').value;
  if (modificarId == "") {
    alert("Tienes que ingresar un ID")
  } else {
    buscar_datos_vehiculos()
    const modificarPrecio = document.getElementById('modificar-precio');
    const modificarKilometraje = document.getElementById('modificar-kilometraje');
    modificarPrecio.disabled = false;
    modificarKilometraje.disabled = false;
    btnModificarDatosModal.disabled = false;
  }
}

btnEliminarDatosModal.onclick = function () {
  const eliminarId = document.getElementById('eliminar-id').value;

  axios({
    method: 'GET',
    url: 'https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?id=eq.' + eliminarId,
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI'
    }
  })
    .then(function (response) {
      precio = response.data[0][1];
      modelo = response.data[0][2];
      año = response.data[0][3];
      kilometraje = response.data[0][4];

      let text = "¿Estás seguro de eliminar este registro?" + " Precio: " + precio + " Modelo: " + modelo + " Año: " + año + " Kilometraje: " + kilometraje;
      if (confirm(text) == true) {
        eliminar_datos_vehiculo();
        alert("Registro eliminado")
        modalEliminar.style.display = "none";
      } else {
        text = "You canceled!";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

btnConsultarDatosModal.onclick = function () {
  consultar_datos_vehiculo();
}

/* 

    getDatosModificarVehiculo: function () {
        const id = document.getElementById('modificar-id').value;
        const modelo = document.getElementById('modificarModelo').value;
        const año = document.getElementById('modificarAño').value;
        const modificarPrecio = document.getElementById('modificar-precio').value;
        const modificarKilometraje = document.getElementById('modificar-kilometraje').value;
        let formato_precio = Intl.NumberFormat("de-DE");
        let formato_kilometraje = Intl.NumberFormat("de-DE");
        precio = formato_precio.format(modificarPrecio);
        kilometraje = formato_kilometraje.format(modificarKilometraje);

    }, 

    */