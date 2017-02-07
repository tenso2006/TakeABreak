const router = require('express').Router();
const BreaksCtrl = require('./breaksController');

router.get('/', BreaksCtrl.getBreak);

module.exports = router;
