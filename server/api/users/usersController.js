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
      }
    })
  },

  postCompletion: function(req, res, next) {
    const type = req.body.type;
    const query = { email: req.body.email };
    User.findOne(query, function(err, data) {
      const date = new Date().toISOString().slice(0,10);
      let insert = {date: date, reps: 1}
      User.update(query, {$push: {"completedTasks": insert}}, {safe: true, upsert: true, new: true}, function() {
      })

    })
  }
};

module.exports = controller;
