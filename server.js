const express = require('express');
const db = require('./server/db/database');
const api = require('./server/api/api');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;

require('./server/middleware')(app, express);

app.use('/api', api);

io.on('connection', function(socket){
  console.log('a user connected');
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});
