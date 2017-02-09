const express = require('express');
const breaks = require('./breaks/breaksRoutes');
const users = require('./users/usersRoutes');
//const settings = require('./settings/settingRoutes.js');
const router = express.Router();

router.use('/break', breaks);
router.use('/users', users);
//router.use('/settings', settings);

module.exports = router;
