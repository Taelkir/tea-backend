/* API routes */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* Change tea colour */
// ./api/colour?person=tom&drink=tea&colour=%23ffffff = tom prefers their tea to be more like #ffffff? Gotcha.

router.get('/colour', function(req, res, next) {

  let person = req.query.person;
  let drink = req.query.drink;
  let colour = req.query.colour;

  res.send(`${person} prefers their ${drink} to be more like ${decodeURIComponent(colour)}? Gotcha.`);
  
});


/* Add person */

/* Add sugars */

/* Add drink */

module.exports = router;
