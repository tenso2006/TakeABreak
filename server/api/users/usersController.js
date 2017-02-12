'use strict';
const User = require('./usersModel');

const controller = {

  getUsers: function(req, res, next) {
    User.find(callback).limit(limit);
  },

  getUserByEmail: function(req, res, next) {
    // const userName = {'name': req.params.name};
    User.findOne({ email: req.params.email }, function(err, user) {
      console.log('User is: ', user);
      if (err) {
        console.log('User error: ', err);
      }
      console.log('Request to /api/users/:email successful!');
      res.json(user);
    });
  },

  getUserById: function(id, callback) {
    User.findById(id, callback);
  },

  addUser: function(req, res, next) {
    console.log('user', req.body);
    const user = req.body;
    const email = req.body.email;
    User.find({
      email: email
    }, function(err, foundUser) {
      if (foundUser.length < 1) {
        User.create(user, function(err, newUser) {
          if(err) {
            throw err;
            res.sendStatus(500);
          }
          res.sendStatus(201);
        });
      } else {
        res.sendStatus(302);
      }
    });
  },

  getHistory: function(req, res, next) {
    const query = { email: JSON.parse(req.headers.user).email };
    User.findOne(query)
    .select('completedTasks')
    .exec(function(err, data) {
      if (err) {
        return res.sendStatus(500);
      } else if (data !== null){
        return res.send(data.completedTasks);
      } else {
        return res.status(200).send('No history to display');
      }
    });
  },

  postCompletion: function(req, res, next) {
    const type = req.body.type;
    console.log(req.body.email)
    const date = Number(new Date().toISOString().slice(0,10).replace(/-/g,''));
    User.find({ 'email': req.body.email, 'completedTasks.date': date }, function(err, found) {
      if (!found[0]) {
        User.update({ 'email': req.body.email }, { $push: { 'completedTasks' : { 'date': date, 'reps': 1}}})
        .then( function() { return res.sendStatus(201)});
      } else {
        User.update({ 'email': req.body.email, 'completedTasks.date': date }, { $inc: { 'completedTasks.$.reps' : 1}})
        .then( function() { return res.sendStatus(201)});
      }
    });
  },

  postSetting: function (req, res, next) {
    console.log(req.body);
    //
    // let startTime = (new Date(req.body.startTime).getHours() + ':' + ((new Date(req.body.startTime).getMinutes() < 10) ? '0' + new Date(req.body.startTime).getMinutes() : new Date(req.body.startTime).getMinutes()) + new Date(req.body.startTime)).toString();
    // let endTime = (new Date(req.body.endTime).getHours() + ':' + ((new Date(req.body.endTime).getMinutes() < 10) ? '0' + new Date(req.body.endTime).getMinutes() : new Date(req.body.endTime).getMinutes()) + new Date(req.body.endTime)).toString();

    let setting = {};
    setting.day = req.body.day;
    setting.startTime = req.body.startTime;
    setting.endTime = req.body.endTime;
    setting.breakType = req.body.breakType;

    //console.log('setting.start time ', setting.startTime);
    //console.log('start time ', startTime);

    User.findOneAndUpdate({
      email: req.body.email
    }, {
      $set: {
        settings: setting
      }
    }, {
      new: true
    }, function (err, user) {
      if (err) {
        console.error('error while trying to update setting ', err);
        res.sendStatus(500);
      }
      res.sendStatus(201);
      console.log('user setting updated: ', user);
    });
  },

  getSetting: function (req, res, next) {
    const query = User.where({
      email: req.body.email
    });
    query.findOne(function(err, userData) {
      if (err) {
        console.error('error while getting Settings data ', err);
        return res.sendStatus(500);
      }
      if (userData) {
        console.log('user setting data is ', userData.data);
        res.json(userData.settings[0]);
        //return res.sendStatus(200);
      }
    });
  }
};

module.exports = controller;
