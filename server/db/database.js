const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db_Config = process.env.PROD_MONGODB || 'mongodb://localhost/takeABreak';
const db = mongoose.connect(db_Config);
// const db = mongoose.connect('mongodb://0.0.0.0:27017/'); //AWS

autoIncrement.initialize(db);

module.exports = db;
