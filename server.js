const express = require('express');
const db = require('./server/db/database');
const api = require('./server/api/api');
const app = express();
const port = process.env.PORT || 8000;

require('./server/middleware')(app, express);

app.use('/api', api);

const server = app.listen(port, function() {
  console.log('Listening on ' + port);
});


/*  Sockets   */
const io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket){
	// when receive sdp, broadcast sdp to other user
	socket.on('sdp', function(data){
		console.log('Received SDP from ' + socket.id);
		socket.to(data.room).emit('sdp received', data.sdp);
	});

	// when receive ice candidate, broadcast sdp to other user
	socket.on('ice candidate', function(data){
		console.log('Received ICE candidate from ' + socket.id + ' ' + data.candidate);
		socket.to(data.room).emit('ice candidate received', data.candidate);
	});

	socket.on('message', function(message) {
		console.log('Got message:', message);
    // for a real app, would be room only (not broadcast)
		socket.broadcast.emit('message', message);
	});

	socket.on('create or join', function(room) {
    var existingRoom = io.sockets.adapter.rooms[room];

    if (existingRoom) {
      console.log(existingRoom.length);
    }

		if (!existingRoom) {
			socket.join(room);
			io.to(room).emit('empty', room);
      return;
		}
		else if (existingRoom.length === 1) {
			socket.join(room);
			socket.to(room).emit('joined', room, existingRoom.length + 1);
		}
		// only allow 2 users max per room
		else {
			socket.emit('full', room);
		}

	});

	socket.on('error', function(error){
		console.error(error);
	})
});
