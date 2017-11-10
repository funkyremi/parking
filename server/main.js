import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Parkings.permit(['insert','update','remove']).never();

Meteor.publish('Parkings',function(){
  return Parkings.find();
})

SyncedCron.config({
  log: false,
});
SyncedCron.add({
  name: 'Update parkings data',
  schedule(parser) {
    return parser.text('every 1 min');
  },
  job() {
    Meteor.call('getParkingData');
  },
});
SyncedCron.start();

Meteor.startup(() => {
  Meteor.call('getParkingData');
});

Meteor.methods({
  'getParkingData'() {
    const data = HTTP.call('GET', 'https://data.montpellier3m.fr/api/3/action/package_show?id=90e17b94-989f-4d66-83f4-766d4587bec2').content;
    const resources = JSON.parse(data).result[0].resources;
    resources.forEach((res) => {
      const name = res.name;
      if (name && !name.includes('.xml')) {
        const park = HTTP.call('GET', res.url).content;
        xml2js.parseString(park, function (err, res) {
          try {
            Parkings.update(
              { name },
              {
                $set: {
                  name,
                  status: res.park.Status,
                  free: res.park.Free,
                  total: res.park.Total,
                }
              },
              { upsert: true }
            );
          } catch(e) {
            // console.error(e);
          }
        });
      }
    });
  }
})