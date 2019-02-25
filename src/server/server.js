var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  socket.on('ROOM_CONNECT', (...args) => {
    console.log(args);

    const ackCallback = args.pop();
    const [room, ...restArgs] = args;

    console.log(room);
    console.log(restArgs);
    console.log(ackCallback);

    socket.leaveAll();

    const rooms = socket.adapter.rooms;
    if (!rooms[room] || rooms[room].length < 2) {
      socket.join(room, err => {
        console.log('user joined room: ' + room);
        ackCallback({
          connected: true,
          connectedRoom: room,
          info: 'polaczono'
        });
      });
    } else {
      ackCallback({
        connected: false,
        connectedRoom: null,
        info: 'pokoj jest pelny'
      });
    }
  });

  // socket.on('dispatch', function(data) {
  //   socket.broadcast.to(data.room).emit('dispatch', data);
  // });

  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  // todo: weryfikacja czy emit jest wyslany z pokoju czy z zewnatrz

  socket.on('NEW_GAME', room => {
    console.log('new game');
    socket.broadcast.to(room).emit('NEW_GAME');
  });
  socket.on('CELL_CLICK', (room, msg) => {
    console.log(msg);
    socket.broadcast.to(room).emit('CELL_CLICK', msg);
  });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});
