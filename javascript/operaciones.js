import config from './supabase/config.js';

const Modelo = {
    async insertarDatosVehiculo(modelo, año, kilometraje, precio) {
        const datos_insertar = {
            modelo: modelo,
            año: año,
            kilometraje: kilometraje + " km",
            precio: "$ " + precio
        }
        const res = await axios({
            method: "POST",
            url: "https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault",
            headers: config.headers,
            data: datos_insertar
        });
        return res;
    },

    async modificarDatosVehiculo(id, modelo, año, kilometraje, precio) {
        const datos_modificar = {
            modelo: modelo,
            año: año,
            kilometraje: kilometraje + " km",
            precio: "$ " + precio
        }

        const res = await axios({
            method: "UPDATE",
            url: "https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?id=is." + id,
            headers: config.headers,
            data: datos_modificar
        });
        return res;
    },

    async buscarDatosVehiculo(id) {

        const res = await axios({
            method: "GET",
            url: "https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?id=eq." + id,
            headers: config.headers,
        });
        return res;
    },
}

const Controlador = {
    cargarInfoTablas: function () {
        axios({
            method: 'GET',
            url: 'https://elofgzyhnliurwchnmse.supabase.co/rest/v1/vehiculos_renault?select=*',
            headers: config.headers
        })
            .then(function (response) {
                Vista.cargarInfoTablas(response.data);
            })
            .catch(function (error) {
                console.log(error)
                Vista.mostrarMensajeError(error);
            })
    },

    /* MODAL INSERTAR */
    async insertarDatosVehiculo() {
        const { modelo, año, kilometraje, precio } = Vista.getDatosInsertarVehiculo();
        try {
            const res = await Modelo.insertarDatosVehiculo(modelo, año, kilometraje, precio);
            /*if (res.status == "200") { 
              console.log(res.status)
            }*/
            console.log(res)
        } catch (err) {
            Vista.mostrarMensajeError(err);
        }
    },

    /* MODAL MODIFICAR*/
    async modificarDatosVehiculo() {
        const { modelo, año, kilometraje, precio } = Vista.getDatosVehiculo();
        try {
            const res = await Modelo.getDatosModificarVehiculo(id, modelo, año, kilometraje, precio);
            /*if (res.status == "200") { 
              console.log(res.status)
            }*/
            console.log(res)
        } catch (err) {
            Vista.mostrarMensajeError('Error al insertar datos');
        }
    },

    async setIdVehiculoModificar() {
        const { id } = Vista.getIdVehiculoModificar();
        try {
            const response = await Modelo.buscarDatosVehiculo(id);
            Vista.mostrarDatosVehiculoModificar(response);
        } catch (err) {
            Vista.mostrarMensajeError(err);
        }
    },

    /* MODAL BUSCAR */
    async mostrarDatosVehiculo() {
        const { id } = Vista.buscarVehiculo();
        try {
            const response = await Modelo.buscarDatosVehiculo(id);
            Vista.mostrarVehiculoTabla(response);

        } catch (err) {
            Vista.mostrarMensajeError(err);
        }
    },
}

const Vista = {
    /* PAGINA PRINCIPAL */
    cargarInfoTablas: function (datos) {

        const tablaPrincipalCuerpo = document.getElementById('tabla-principal-cuerpo');

        datos.forEach(datos => {
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
    },

    /* MODAL INSERTAR */
    getDatosInsertarVehiculo: function () {
        const modelo = document.getElementById('campo-modelo__combobox').value;
        const año = document.getElementById('campo-year__combobox').value;
        let kilometraje = document.getElementById("kilometraje").value;
        let precio = document.getElementById("precio").value;
        let formato_precio = Intl.NumberFormat("de-DE");
        let formato_kilometraje = Intl.NumberFormat("de-DE");

        precio = formato_precio.format(precio);
        kilometraje = formato_kilometraje.format(kilometraje);

        return { modelo, año, kilometraje, precio };
    },

    /* MODAL MODIFICAR*/
    getIdVehiculoModificar: function () {
        const id = document.getElementById('modificar-id').value;
        return { id };
    },
    mostrarDatosVehiculoModificar: function (response){
        let modelo = document.getElementById('modificarModelo');
        let año = document.getElementById('modificarAño');
        let precio = document.getElementById('modificar-precio');
        let kilometraje = document.getElementById('modificar-kilometraje');
        
        let precioAFormatear = response.data[0].precio;
        let kmFormateado = response.data[0].kilometraje;

        const precioSinDolar = precioAFormatear.replace("$", "");
        const valorSinKm = kmFormateado.replace("km", "")

        const precioFinal = Number(precioSinDolar.replace(/\./g, ""));
        const kmFinal = Number(valorSinKm.replace(/\./g, ""));

        año.value = response.data[0].año;
        modelo.value = response.data[0].modelo;
        precio.value = precioFinal;
        kilometraje.value = kmFinal;
    },

    /* MODAL BUSCAR */
    buscarVehiculo: function () {
        const id = document.getElementById('modalConsultarCampoId').value;
        return { id };
    },

    mostrarVehiculoTabla: function (response) {
        const tbodyConsultar = document.getElementById('tablaCuerpoResultadosDatosVehiculo');
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

    },

    /* MENSAJES DE ERRORES */
    mostrarMensajeError(mensaje) {
        alert(mensaje);
    }
}

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

btnInsertarDatosModal.onclick = function () {
    const campo_kilometraje = document.getElementById("kilometraje").value;
    const campo_precio = document.getElementById("precio").value;

    if (campo_kilometraje == "" || campo_precio == "") {
        alert("Asegurate que los campos no estén vacíos");
    } else {
        let text = "¿Estás seguro que deseas insertar este registro?";
        if (confirm(text) == true) {
            alert("Registro insertado");
            Controlador.insertarDatosVehiculo();
            modalInsertar.style.display = "none";
        } else {
            text = "You canceled!";
        }
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

btnBuscarModificarDatosModal.onclick = function () {

    const modificarId = document.getElementById('modificar-id').value;
    if (modificarId == "") {
        alert("Tienes que ingresar un ID")
    } else {
        Controlador.setIdVehiculoModificar();
        /*
        const modificarPrecio = document.getElementById('modificar-precio');
        const modificarKilometraje = document.getElementById('modificar-kilometraje');
        modificarPrecio.disabled = false;
        modificarKilometraje.disabled = false;
        btnModificarDatosModal.disabled = false;*/
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

btnConsultarDatosModal.onclick = function () {
    Controlador.mostrarDatosVehiculo();
}


document.addEventListener('DOMContentLoaded', function () {
    Controlador.cargarInfoTablas();
})