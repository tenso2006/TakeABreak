const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
// const mentalBreaks = require('../../db/data/mental.json');
// const physicalBreaks = require('../../db/data/physical.json');
const breaks = require('../../db/data/breaks.json');

const breakSchema = mongoose.Schema({
  length: {type: String, required: true},
  type: {type: String, required: true},
  title: {type: String, required: true},
  audio: {type: String},
  video: {type: String},
  description: {type: String}
});

breakSchema.plugin(autoIncrement.plugin, {
  model: 'Break',
  startAt: 1,
});

const Break = mongoose.model('Break', breakSchema);

Break.resetCount(function(err, nextCount) {
  console.log('Count is at: ', nextCount);
});

/*  Un-comment to initialize database */
Break.create(breaks, function(err, breaks) {
  if (err) {
    return console.log('dupe key error in breaksModel.js, this is normal');
  }
});

module.exports = Break;
