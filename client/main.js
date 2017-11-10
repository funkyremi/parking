import Chart from 'chart.js';

Template.App.onCreated(function() {
  this.subscribe('Parkings');
  Session.set('search', '');
});

Template.App.onRendered(()=>{
  Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.options.centertext) {
            var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 80).toFixed(2); // was: 114
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = chart.options.centertext, // "75%",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2 - (chart.titleBlock.height);

            ctx.fillText(text, textX, textY);
            ctx.save();
        }
      }
  });
})

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
          },
          centertext: Number(self.free)
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
