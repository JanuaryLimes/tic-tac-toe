const express = require('express');
const path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use((req, res, next) => {
  const environments = ['production'];
  const status = 302;

  if (environments.indexOf(process.env.NODE_ENV) >= 0) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(status, 'https://' + req.hostname + req.originalUrl);
    } else {
      next();
    }
  } else {
    next();
  }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../build/index.html'));
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('ROOM_CONNECT', (...args) => {
    const ackCallback = args.pop();
    const room = args.shift();

    emitPlayerDisconnected(socket);
    socket.leaveAll();

    const data = {
      connected: false,
      connectedRoom: null,
      roomIsFull: false,
      error: null,
      playersInRoom: 0
    };

    const rooms = socket.adapter.rooms;
    if (!rooms[room] || rooms[room].length < 2) {
      socket.join(room, err => {
        if (err) {
          ackCallback({ ...data, error: err });
        } else {
          console.log('Połączono do pokoju ' + room, socket.id);
          const callbackData = {
            ...data,
            connected: true,
            connectedRoom: room,
            playersInRoom: rooms[room].length,
            playerSide: 'cross'
          };
          ackCallback(callbackData);
          socket.broadcast.to(room).emit('PLAYER_JOINED_THE_ROOM', {
            ...callbackData,
            playerSide: 'circle'
          });
        }
      });
    } else {
      ackCallback({ ...data, roomIsFull: true });
    }
  });

  const emitPlayerDisconnected = socket => {
    if (socket.rooms) {
      console.log('emitPlayerDisconnected');
      Object.keys(socket.rooms).forEach(room => {
        if (socket.adapter.rooms && socket.adapter.rooms[room]) {
          const playersInRoom = socket.adapter.rooms[room].length - 1;
          socket.broadcast.to(room).emit('PLAYER_DISCONNECTED', playersInRoom);
        }
      });
    }
  };

  socket.on('disconnecting', reason => {
    emitPlayerDisconnected(socket);
    console.log('user disconnecting', reason);
  });

  socket.on('disconnect', function(reason) {
    console.log('user disconnected', reason);
  });

  socket.on('NEW_GAME', room => {
    console.log('new game');
    io.in(room).emit('NEW_GAME');
  });

  socket.on('CELL_CLICK', (room, msg) => {
    console.log(msg);
    io.in(room).emit('CELL_CLICK', msg);
  });
});
