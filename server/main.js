import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  'getParkingData'() {
    const data = HTTP.call('GET', 'https://data.montpellier3m.fr/api/3/action/package_show?id=90e17b94-989f-4d66-83f4-766d4587bec2').content;
    const resources = JSON.parse(data).result[0].resources;
    resources.forEach((res) => {
      const park = HTTP.call('GET', res.url).content;
      xml2js.parseString(park, function (err, res) {
        try {
          console.log(res.park.Name);
          Parkings.update(
            { name: res.park.Name },
            {
              $set: {
                name: res.park.Name,
                status: res.park.Status,
                free: res.park.Free,
                total: res.park.Total,
              }
            },
            { upsert: true }
          );
        } catch(e) {
          console.log('Error');
        }
      });
    });
  }
})