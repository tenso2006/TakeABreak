const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db_Config = PROD_MONGODB || 'mongodb://localhost/takeABreak';
const db = mongoose.connect(db_Config);
autoIncrement.initialize(db);

module.exports = db;
