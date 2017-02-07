const bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(express.static(__dirname + '../client'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
}
