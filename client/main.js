Template.App.helpers({
  parkings() {
    return Parkings.find();
  },
  formatNumber(str) {
    return Number(str);
  },
  statusColor(status) {
    return status == 'Open' ? 'text-success' : 'text-danger';
  }
});

Template.App.events({
  'click .refresh'(event, instance) {
    Meteor.call('getParkingData');
  },
});
