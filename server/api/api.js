const express = require('express');
const breaks = require('./breaks/breaksRoutes');
const users = require('./users/usersRoutes');
const router = express.Router();

router.use('/break', breaks);
router.use('/users', users);

module.exports = router;
