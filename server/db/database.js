const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
// const db = mongoose.connect('mongodb://localhost/takeABreak'); // Dev
const db = mongoose.connect('mongodb://ds019886.mlab.com:19886/heroku_s4t93j7w'); // Prod
autoIncrement.initialize(db);

module.exports = db;
