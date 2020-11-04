const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
// These statements give us a way to use hbs
// for server-side templating.
app.set('view engine', 'hbs'); // sets hbs as the view engine
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory. This allows us to serve up
// the public directory so those assets (HTML, CSS,
// JavaScript, images) can be accessed by the browser.
app.use(express.static(publicDirectoryPath));
// app.use(express.static('public'));  <-- this would work as well

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'AR' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About AR', name: 'AR' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some useful text.',
    title: 'Help',
    name: 'AR',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: 'You must provide an address' });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({ forecast: weatherData, location, address });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// catch-all for help 404s
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'AR',
    errorMessage: 'Help article not found.',
  });
});

// catch-all for any 404s
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'AR',
    errorMessage: 'Page not found.',
  });
});

// Start the server. The process of starting up a
// server is an asynchronous process, though it will
// happen almost instantaneously.
app.listen(3000, () => {
  console.log('Server is up on port 3000.'); // doesn't get displayed to the client
});
