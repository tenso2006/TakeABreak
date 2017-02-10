User = require('./usersModel');

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
    })
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
    const date = new Date().toISOString().slice(0,10);
    User.update({ 'email': req.body.email, 'completedTasks.date': 'blah' }, { $inc: { 'completedTasks.$.reps': 1 }})
    .then(function() { res.send(arguments); })
      // const date = new Date().toISOString().slice(0,10);
      // let insert = {date: date, reps: 1}
      // User.update(query, { $inc: { completedTasks : insert}}, {safe: true, upsert: true, new: true}, function() {
      // })
  },

  postSetting : function (req, res, next) {
    console.log(req.body);
    const setting = req.body;
    User.findOneAndUpdate({email: req.body.email}, {$set: {settings: setting}}, {new: true}, function (err, user) {
      if (err) {
        console.error('error while trying to update setting ', err);
      }
      console.log('user setting updated: ', user);
    });
  }
};

module.exports = controller;
