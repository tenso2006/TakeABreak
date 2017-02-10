const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  completedTasks: [{date: String, reps: Number}],
  settings: [
    {
      day: {type: String, required: true},
      startTime: {type: Date, required: true},
      endTime: {type: Date, required: true},
      breakType: {type: String, required: true}
    }
  ]
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
