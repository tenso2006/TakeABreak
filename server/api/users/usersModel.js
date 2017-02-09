const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  completedTasks: [{date: String, reps: Number}]

});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
