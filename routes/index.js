const express = require('express');
const router = express.Router();

// On a get request for the root route, if there's a username stored in a cookie, render the index file, passing in 'name', otherwise redirect the client to the '/hello' route. In effect, we're requiring the user to log in.
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    }
});

// On a get request for the '/hello' route, if there's a username stored in a cookie, redirect the client to the root route, otherwise render the 'hello' file. In effect, if a user is not logged in, load the log in page. But if a user is already logged in, redirect any attempt to go to '/hello' to the homepage.
router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

// On a post request to the 'hello' route, set a cookie for username, and redirect the client to the root route
router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

// On a post request to the '/goodbye' route, clear the username cookie, and redirect to the '/hello' route.
router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

module.exports = router
