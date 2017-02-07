const express = require('express');
const db = require('./server/db/database');
const api = require('./server/api/api');
const app = express();
const port = process.env.PORT || 8000;

require('./server/middleware')(app, express);

app.use('/api', api);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
