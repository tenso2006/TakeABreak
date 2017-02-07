Breaks = require('./breaksModel');

const controller = {
  getBreak: function (req, res, next) {
    const BreakId = randNumGen();

    //TODO: FindAll and then get a random break
    Breaks.find({_id: BreakId}, function(err, aBreak) {
      if (err) {
        console.log('Could Not retrieve a specific Break: ', err);
        res.sendStatus(500);
      }
      res.json(aBreak);
    });

    function randNumGen() {
      // TODO: change '10' to 'breaks.length'...
      return Math.floor(Math.random() * 10) + 1;
    };
  }
}

module.exports = controller;
