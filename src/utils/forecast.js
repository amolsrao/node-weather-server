const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7d24fc634ded588922c32e9917378a4e&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      console.log('body.current = ', body.current);
      const {
        temperature,
        feelslike,
        weather_descriptions,
        pressure,
        visibility,
        observation_time,
      } = body.current;

      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The pressure today is ${pressure} and a visibility of ${visibility} at ${observation_time}.`
      );
    }
  });
};

module.exports = forecast;
