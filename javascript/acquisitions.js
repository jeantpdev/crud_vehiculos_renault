// URL de la API pública
const endpoint = 'http://127.0.0.1:4000/get_user_info';

// Realizar una solicitud HTTP utilizando fetch para obtener los datos de la API
fetch(endpoint)
  .then(response => response.json())
  .then(data => {

    console.log(data)
    // Formatear los datos para que puedan ser utilizados por Chart.js
    const labels = data.map(item => item.modelo); // X
    const values = data.map(item => item.cantidad); //Y

    // GRAFICA 1
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad',
          backgroundColor: 'rgba(0, 99, 132, 0.2)',
          borderColor: 'rgba(0, 99, 132, 1)',
          borderWidth: 1,
          data: values,
        }]
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

    // GRAFICA 2

    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const chart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad',
          backgroundColor: 'rgba(0, 99, 132, 0.2)',
          borderColor: 'rgba(0, 99, 132, 1)',
          borderWidth: 1,
          data: values,
        }]
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

// GRAFICA 2

const ctx3 = document.getElementById('myChart3').getContext('2d');
const chart3 = new Chart(ctx3, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      label: 'Cantidad',
      backgroundColor: 'rgba(0, 99, 132, 0.2)',
      borderColor: 'rgba(0, 99, 132, 1)',
      borderWidth: 1,
      data: values,
    }]
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

// GRAFICA 2

const ctx4 = document.getElementById('myChart4').getContext('2d');
const chart4 = new Chart(ctx4, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      label: 'Cantidad',
      backgroundColor: 'rgba(0, 99, 132, 0.2)',
      borderColor: 'rgba(0, 99, 132, 1)',
      borderWidth: 1,
      data: values,
    }]
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

// GRAFICA 2

const ctx5 = document.getElementById('myChart5').getContext('2d');
const chart5 = new Chart(ctx5, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      label: 'Cantidad',
      backgroundColor: 'rgba(0, 99, 132, 0.2)',
      borderColor: 'rgba(0, 99, 132, 1)',
      borderWidth: 1,
      data: values,
    }]
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

// GRAFICA 2

const ctx6 = document.getElementById('myChart6').getContext('2d');
const chart6 = new Chart(ctx6, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      label: 'Cantidad',
      backgroundColor: 'rgba(0, 99, 132, 0.2)',
      borderColor: 'rgba(0, 99, 132, 1)',
      borderWidth: 1,
      data: values,
    }]
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



})


  .catch (error => {
  console.error(error);
});