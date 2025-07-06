const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id:Number,
  name:String,
  firstname:String,
  lastname:String,
  age:Number,
  birth: {
    date:Date,
    place:String,
    country:String,
  },
  nationality:String,
  height:String,
  weight:String,
  number:Number,
  position:String,
  photo:String
});

const Player = mongoose.model('Player', playerSchema);

module.exports = {Player};