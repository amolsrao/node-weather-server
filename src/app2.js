// To stay organized we require core modules
// before we require npm modules
const path = require('path');

// express library just exposes a single
// function called as express
const express = require('express');

// import partials
const hbs = require('hbs');

// creates an application; express function
// doesn’t take any argument.
const app = express();

// __dirname contains path to the directory the current script lives in.
// __filename contains absolute path for the current script. Both
// __dirname and __filename are injected by the wrapper function (IIFE).
console.log(__dirname);

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
// These statements give us a way to use hbs
// for server-side templating.
app.set('view engine', 'hbs'); // sets hbs as the view engine
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory. This allows us to serve up
// the public directory so those assets (HTML, CSS,
// JavaScript, images) can be accessed by the browser.
app.use(express.static(publicDirectoryPath));
// With the app.use() statement above the route handler
// we set up below will not be taken into account. Express
// works through your application until it finds a match
// for that route. Note that whenever express finds a file
// with the name index.html, it maps it to the root url
// because index.html has a special significance.

// If you only provide the folder name, it'll
// look for that folder in the project root
// app.use(express.static('public'));  <-- this would work as well

// this lets us configure what the server should
// do when someone tries to get the resource at a
// specific url. Maybe we should be sending back
// HTML or maybe we should be sending back JSON.
// where callback = (req, res) => {}
// callback decides what one should do when someone
// visits a particular route.
// req contains information about the incoming
// request to the server. res contains a bunch of
// methods allowing us to customize what we’re
// going to send back to the requester
// Route: app.com
// app.get('', (req, res) => {
//   // send something back to the requester
//   res.send('<h1>Weather</h1>');
// });

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

// Start the server. The process of starting up a
// server is an asynchronous process, though it will
// happen almost instantaneously.
app.listen(3000, () => {
  console.log('Server is up on port 3000.'); // doesn't get displayed to the client
});
