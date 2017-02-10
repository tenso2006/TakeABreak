const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mentalBreaks = require('../../db/data/mental.json');
const physicalBreaks = require('../../db/data/physical.json');

const breakSchema = mongoose.Schema({
  length: {type: String, required: true},
  type: {type: String, required: true},
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true, unique: true},
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
// Break.create(mentalBreaks, function(err, breaks) {
//   if (err) {
//     return console.log(err);
//   }
//   // Create Physical Break JSON upload
//   Break.create(physicalBreaks, function(err, breaks) {
//     if (err) {
//       return console.log(err);
//     }
//   });
// });

module.exports = Break;
