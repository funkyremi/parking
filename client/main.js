import Chart from 'chart.js';

Template.App.onCreated(() => {
  Session.set('search', '');
});

Template.App.helpers({
  parkings() {
    const regex = new RegExp(Session.get('search'), 'i');
    return Parkings.find({ name: regex });
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
  'keyup #search'(event, instance) {
    Session.set('search', event.target.value);
  }
});
