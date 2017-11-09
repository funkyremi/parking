import Chart from 'chart.js';

Template.App.helpers({
  parkings() {
    return Parkings.find();
  },
  formatNumber(str) {
    return Number(str);
  },
  statusColor(status) {
    return status == 'Open' ? 'text-success' : 'text-danger';
  },
  doughnut() {
    const self = this;
    setTimeout(() => {
      const elem = document.getElementById(self._id);
      const config = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              Number(self.total) - Number(self.free),
              Number(self.free),
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
            ],
          }],
          labels: [
            "Places prises",
            "Places restantes",
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      };
      const chart = new Chart(elem, config);
    }, 100);
  },
});

Template.App.events({
  'click .refresh'(event, instance) {
    Meteor.call('getParkingData');
  },
});
