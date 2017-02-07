const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  token: {type: String},
  password: {type: String},
  phoneNumber: {type: String},
  preferences: {
    breaks: {type: Number},
    mental: {type: Number},
    physical: {type: Number},
  },
  completedTasks: [
    // type: mental or physical
    {type: String, date: Date},
  ],
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
