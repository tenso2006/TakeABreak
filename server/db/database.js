const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = mongoose.connect('mongodb://localhost/takeABreak');
autoIncrement.initialize(db);

module.exports = db;
