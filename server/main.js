import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

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