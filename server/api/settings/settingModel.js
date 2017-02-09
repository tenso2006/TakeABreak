const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const settingSchema = mongoose.Schema({
  day: {type: String, required: true},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  breakType: {type: String, required: true}
  //theme: {type: }
});

settingSchema.plugin(autoIncrement.plugin, {
  model: 'Setting',
  startAt: 1
});

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;