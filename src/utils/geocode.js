const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWlzY2FyYW8iLCJhIjoiY2tna2dqemQyMDE1bzJ4bzEzbG43eDY0NiJ9.55_WJHL6j5koKG_g5kg2_w&limit=1`;

  request(
    { url, json: true },
    (error, { body: { features } } = { body: {} }) => {
      if (error) {
        callback('Unable to connect to location service!', undefined);
      } else if (features.length === 0) {
        callback('Unable to find location. Try another search.', undefined);
      } else {
        callback(undefined, {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          location: features[0].place_name,
        });
      }
    }
  );
};

module.exports = geocode;
