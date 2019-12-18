const express = require("express");
const router = express.Router();


// On a get request for the '/card' route, render the card file, passing in 'prompt'.
router.get('/', (req, res) => {
    res.render('card', {prompt: "Who is buried in Grant's tomb?"});
});

module.exports = router;