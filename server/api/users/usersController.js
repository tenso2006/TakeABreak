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
    const userName = req.body;
    User.find(userName, function(err, userFound) {
      if (!userFound) {
        User.create(userName, function(err, newUser) {
          if(err) {
            throw err;
            res.sendStatus(500);
          }
          // Respond back will all 'data' for the 'newUser'
          res.json(newUser);
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
        res.sendStatus(500);
      } else {
        res.send(data.completedTasks);
      }
    });
  },

  postCompletion: function(req, res, next) {
    const type = req.body.type;
    const query = { email: req.body.email };
    console.log(query);
    User.findOne(query)
    .select('completedTasks')
    .exec(function(err, data) { console.log('wtf did we get', arguments); res.send(data.completedTasks)})
      // const date = new Date().toISOString().slice(0,10);
      // let insert = {date: date, reps: 1}
      // User.update(query, { $inc: { completedTasks : insert}}, {safe: true, upsert: true, new: true}, function() {
      // })
  }
};

module.exports = controller;
