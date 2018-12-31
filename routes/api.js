/* API routes */

var express = require('express');
var router = express.Router();

// DB schema
const Person = require("../models/person");

/* Add person */

router.post("/person", function(req, res, next){
  console.dir(req.body);
  // Check that all the data has been submitted
  if (req.body.name && req.body.drink && req.body.colourHex) {
    // Put together the data in an object
    const personData = {
      name: req.body.name,
      drink: req.body.drink,
      colourHex: req.body.colourHex,
      imageSrc: req.body.imageSrc
    }

    // Send that data to mongo
    const newPerson = new Person(personData);
    newPerson.save(function(err) {
      if (err) {
        // If it went wrong

        return next(err);
      } else {
        // If it went right
        res.send({success: true})
      }
    });

  } else {
    const err = new Error("Did not supply enough information for a new person.");
    next(err);
  }
});

/* Change tea colour */
// e.g. ./api/colour?person=tom&drink=tea&colour=%23ffffff = tom prefers their tea to be more like #ffffff? Gotcha.
router.get('/colour', function(req, res, next) {

  let person = req.query.person;
  let drink = req.query.drink;
  let colour = req.query.colour;

  res.send(`${person} prefers their ${drink} to be more like ${decodeURIComponent(colour)}? Gotcha.`);

});

/* Add sugars */

/* Add drink */

module.exports = router;
