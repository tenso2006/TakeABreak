const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = mongoose.connect('mongodb://localhost/takeABreak');
// const db = mongoose.connect('mongodb://0.0.0.0:27017/');
autoIncrement.initialize(db);

module.exports = db;
