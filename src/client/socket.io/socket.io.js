import io from 'socket.io-client';
import { devConsole } from '../../utils';

const createSocket = store => {
  let socket;

  if (process.env.NODE_ENV === 'production') {
    devConsole('production');
    socket = io.connect();
  } else {
    devConsole('dev');
    const PORT = process.env.PORT || 5000;
    socket = io.connect('localhost:' + PORT);
  }

  devConsole('check 1', socket.connected);
  socket.on('connect', function() {
    devConsole('check 2', socket.connected);
  });

  socket.on('CELL_CLICK', msg => {
    store.dispatch({ type: 'CELL_CLICK', id: msg });

    const thunkRestartGame = () => (dispatch, getState) => {
      const { gameOver } = getState().tictactoe;
      if (gameOver) {
        setTimeout(() => {
          dispatch({ type: 'SOCKET', event: 'NEW_GAME' });
        }, 3000);
      }
    };

    store.dispatch(thunkRestartGame());
  });

  socket.on('NEW_GAME', () => {
    store.dispatch({ type: 'NEW_GAME' });
  });

  socket.on('PLAYER_JOINED_THE_ROOM', args => {
    devConsole('before PLAYER_JOINED_THE_ROOM', store.getState());
    store.dispatch({ type: 'PLAYER_JOINED_THE_ROOM', args });
    devConsole('after PLAYER_JOINED_THE_ROOM', store.getState());
    if (args.playersInRoom === 2) {
      store.dispatch({ type: 'NEW_GAME' });
    }
  });

  socket.on('PLAYER_DISCONNECTED', playersInRoom => {
    store.dispatch({ type: 'PLAYER_DISCONNECTED', playersInRoom });
    devConsole('PLAYER_DISCONNECTED', playersInRoom);
  });

  return socket;
};

export { createSocket };
