const router = require('express').Router();
const SettingCtrl = require('./settingController.js');

router.get('/', SettingCtrl.setBreak);

module.exports = router;