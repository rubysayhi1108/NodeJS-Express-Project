const labels = ['January', 'February', 'March', 'April', 'May', 'June']

const data = {
    labels: labels,
    datasets: [
      {
        label: 'Lợi nhuận',
        backgroundColor: '#FFCC00',
        borderColor: '#FFCC00',
        data: [10, 27, 56, 34, 24, 53],
        tension: 0.4,
      },
      {
        label: 'Doanh số',
        backgroundColor: 'black',
        borderColor: 'black',
        data: [0, 34, 32, 23, 2, 82],
        tension: 0.4,
      },
    ],
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true, // Bật sử dụng hình vuông
            pointStyle: 'rect',  // Chọn hình vuông
          },
        },
      },
    },
  };
  
  const canvas = document.getElementById('canvas');
  const chart = new Chart(canvas, config);
  
  