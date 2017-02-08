const router = require('express').Router();
const UsersCtrl = require('./usersController');

// TODO: Get All Users
// app.get('/api/users', function(req, res) {
//   console.log('server.js - api/users');
//   User.getUsers(function(err, users) {
//     if (err) {
//       console.log('Could not retrieve All Users: ', err);
//     }
//     res.json(users);
//   });
// });

router.get('/', UsersCtrl.getUsers);
router.get('/:email', UsersCtrl.getUserByEmail);

// TODO: Create a route to get UserById!
// '/api/users/:id - http://mongoosejs.com/docs/api.html#model_Model.findById
// app.get('/:id', UsersCtrl.getUserById);

router.post('/', UsersCtrl.addUser);
router.post('/completion', UsersCtrl.postCompletion);

module.exports = router;
