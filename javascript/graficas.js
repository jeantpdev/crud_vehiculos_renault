// URL de la API pública
const endpoint = 'http://localhost:4000/mostrar_registros_tabla/';


fetch('http://127.0.0.1:4000/get_user_info')
  .then(response => response.json())
  .then(data => {

    console.log(data)
    // DATA A USAR
    const labels = data.map(item => item.modelo); // X
    const values = data.map(item => item.cantidad); //Y

    // Cantidad de carros según el modelo

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cantidad carros',
            data: values
          },
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });

    // Obtener el elemento select y crear opciones para cada modelo
    const selectModelo = document.getElementById('select-modelo');
    labels.forEach((label, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = label;
      selectModelo.add(option);
    });

    // Agregar evento onChange para actualizar el gráfico
    selectModelo.addEventListener('change', (event) => {
      const selectedIndex = event.target.value;
      const newData = {
        labels: labels,
        datasets: [{
          label: 'Cantidad carros',
          data: data[selectedIndex].data
        }]
      };
      chart.data = newData;
      chart.update();
    });
  })
  .catch(error => {
    console.error(error);
  });

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const labels = [...new Set(data.map(v => v.año))];
    const labels_ordenado = labels.sort((a, b) => a - b);
    const modelos = [...new Set(data.map(v => v.modelo))];
    const datasets = modelos.map(modelo => {
      const datosModelo = labels_ordenado.map(año => {
        const vehiculos = data.filter(v => v.modelo === modelo && v.año === año);
        return vehiculos.length;
      });
      return {
        label: modelo,
        data: datosModelo,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`,
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
        borderWidth: 1
      };
    });
    const datos = {
      labels: labels_ordenado,
      datasets: datasets
    };
    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: datos,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error(error));

// Conectar con la API y extraer los datos utilizando fetch
fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const modelos = data.map(d => d.modelo);
    const años = data.map(d => d.año);
    const kilometrajes = data.map(d => d.kilometraje);
    const precios = data.map(d => d.precio);

    function obtenerKilometrajes(kilometrajes) {
      return kilometrajes.map(km => {
        var valorSinKm = km.replace("km", "");
        var kmFinal = Number(valorSinKm.replace(/\./g, ""));
        return kmFinal;
      });
    }

    function obtenerPrecios(precios) {
      return precios.map(p => {
        const valorSinDolar = p.replace("$", "");
        const precioFinal = Number(valorSinDolar.replace(/\./g, ""));
        return precioFinal;
      });
    }
    var p_nuevo = obtenerPrecios(precios)
    var km_nuevo = obtenerKilometrajes(kilometrajes)


    // Crear la gráfica de dispersión
    const ctx = document.getElementById('myChart3').getContext('2d');
    const scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Precio vs Kilometraje',
          data: km_nuevo.map(function (x, i) {
            return {
              x: x,
              y: p_nuevo[i]
            };
          }),
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#cc65fe',
            '#ffce56',
            '#4bc0c0',
            '#9966ff',
            '#ffcc99'
          ],

          pointRadius: 3,
          pointHoverRadius: 10
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Kilometraje'
            }
          }],
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Precio'
            }
          }]
        }
      }
    });
  })
  .catch(error => console.error(error));


fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    // Obtener la cantidad de registros para cada modelo
    const modelos = {};
    data.forEach(d => {
      modelos[d.modelo] = modelos[d.modelo] ? modelos[d.modelo] + 1 : 1;
    });

    // Crear los arrays para los nombres y cantidades
    const nombresModelos = Object.keys(modelos);
    const cantidadesModelos = Object.values(modelos);

    // Crear la gráfica de pastel
    const ctx = document.getElementById('myChart4').getContext('2d');
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: nombresModelos,
        datasets: [{
          data: cantidadesModelos,
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#cc65fe',
            '#ffce56',
            '#4bc0c0',
            '#9966ff',
            '#ffcc99'
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Distribución de modelos'
        }
      }
    });
  })
  .catch(error => console.error(error));


// Hacer una llamada a la API para obtener los datos de precio, modelo y año


fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const precios = data.map(d => d.precio);
    const kilometrajes = data.map(d => d.kilometraje);
    const modelos = {};
    data.forEach(d => {
      modelos[d.modelo] = modelos[d.modelo] ? modelos[d.modelo] + 1 : 1;
    });

    // Crear los arrays para los nombres y cantidades
    const nombresModelos = Object.keys(modelos);

    function obtenerPrecios(precios) {
      return precios.map(p => {
        const valorSinDolar = p.replace("$", "");
        const precioFinal = Number(valorSinDolar.replace(/\./g, ""));
        return precioFinal;
      });
    }

    function obtenerKilometrajes(kilometrajes) {
      return kilometrajes.map(km => {
        var valorSinKm = km.replace("km", "");
        var kmFinal = Number(valorSinKm.replace(/\./g, ""));
        return kmFinal;
      });
    }

    var km_nuevo = obtenerKilometrajes(kilometrajes)
    var p_nuevo = obtenerPrecios(precios)


    const chartData = {
      labels: nombresModelos,
      datasets: [
        {
          label: 'Precio',
          data: p_nuevo,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Kilometraje',
          data: km_nuevo,
          backgroundColor: 'rgba(115, 174, 30, 0.8)',
          borderColor: 'rgba(115, 174, 30, 0.8)',
          borderWidth: 1
        }
      ]
    };
    const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },

        }
      }
    };
    const myChart = new Chart(document.getElementById('myChart5'), chartConfig);
  })
  .catch(error => console.error(error));


fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    // Obtener la cantidad de registros para cada modelo
    const modelos = {};
    data.forEach(d => {
      modelos[d.modelo] = modelos[d.modelo] ? modelos[d.modelo] + 1 : 1;
    });

    // Crear los arrays para los nombres y cantidades
    const nombresModelos = Object.keys(modelos);
    const cantidadesModelos = Object.values(modelos);

    // Crear la gráfica de pastel
    const ctx = document.getElementById('myChart6').getContext('2d');
    const polarArea = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: nombresModelos,
        datasets: [{
          data: cantidadesModelos,
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#cc65fe',
            '#ffce56',
            '#4bc0c0',
            '#9966ff',
            '#ffcc99'
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Distribución de modelos'
        }
      }
    });
  })
  .catch(error => console.error(error));