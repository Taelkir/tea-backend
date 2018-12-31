const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  drink : {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  colourHex: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  imageSrc: {
    type: String,
    required: false,
    trim: true
  }
});

PersonSchema.statics.changeColour = function(person, newColourHex, callback) {
  const conditions = { name: person };
  const update = { colourHex: newColourHex };
  Person.findOneAndUpdate(conditions, update, callback);
}


// todo: PersonSchema.pre(make sure the person doesn't already exist when saving a new one)

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
