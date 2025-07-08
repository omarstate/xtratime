// startup/database.js
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db_remote = config.get('db_remote');
  const db_local = config.get('db_local');
  mongoose.connect(db_remote)
    .then(() => console.log(`Connected to Cluster0...`));
}