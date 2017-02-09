const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = function(app, express) {
  app.use(morgan('combined'));
  app.use(express.static(__dirname + './../client'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
}
