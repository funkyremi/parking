Template.App.helpers({
  parkings() {
    return Parkings.find();
  },
  formatNumber(str) {
    return Number(str);
  }
});

Template.App.events({
  'click .refresh'(event, instance) {
    Meteor.call('getParkingData');
  },
});
