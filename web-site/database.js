const mongoose = require('mongoose');

const DATABASE_CONNECTION = 'mongodb://mongo/test';

let kittySchema = mongoose.Schema({
  name: String
});

let Kitten = exports.Kitten = mongoose.model('Kitten', kittySchema);

exports.initializeMongo = function() {
  mongoose.connect(DATABASE_CONNECTION);
  console.log('Trying to connect to ' + DATABASE_CONNECTION);

  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error: We might not be as connected as I thought'));
  db.once('open', function() {
    console.log('You are connected!');
    addRandomCat();
  });
}

let addRandomCat = function() {
  let silence = new Kitten({
    name: 'Silence' + Math.random()
  });

  silence.save(function(err, fluffy) {
    if (err) return console.log(err);
    console.log('There is a new random cat in the neighborhood');
  });
}
