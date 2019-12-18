const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// body-parser prepares the response body for use. urlencoded() allows body-parser to parse urlencoded data.
app.use(bodyParser.urlencoded({ extended: false}));
// cookie-parser is required to parse cookies (but not set them)
app.use(cookieParser());

app.set('view engine', 'pug');

// On a get request for the root route, if there's a username stored in a cookie, render the index file, passing in 'name', otherwise redirect the client to the '/hello' route. In effect, we're requiring the user to log in.
app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

// On a get request for the '/card' route, render the card file, passing in 'prompt'.
app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

// On a get request for the '/hello' route, if there's a username stored in a cookie, redirect the client to the root route, otherwise render the 'hello' file. In effect, if a user is not logged in, load the log in page. But if a user is already logged in, redirect any attempt to go to '/hello' to the homepage.
app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

// On a post request to the 'hello' route, set a cookie for username, and redirect the client to the root route
app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});