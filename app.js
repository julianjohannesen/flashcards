const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// body-parser prepares the response body for use. urlencoded() allows body-parser to parse urlencoded data.
app.use(bodyParser.urlencoded({ extended: false}));
// cookie-parser is required to parse cookies (but not set them)
app.use(cookieParser());
// Serve any static assets at '/static' from 'public'
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

// Use the routes in the router directory
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards.js');
app.use(mainRoutes);
app.use('./cards', cardRoutes);

// Use a custom error handler for 404 errors. Pass the error to the next error handler.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Use a custom error handler for all routes. Render the 'error' file, passing down the err object and status
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});