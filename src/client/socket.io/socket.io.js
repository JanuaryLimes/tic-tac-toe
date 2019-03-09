import { store } from '../redux/store';
import io from 'socket.io-client';

let socket;

if (process.env.NODE_ENV === 'production') {
  console.log('production');
  socket = io.connect();
} else {
  console.log('dev');
  const PORT = process.env.PORT || 5000;
  socket = io.connect('localhost:' + PORT);
}

console.log('check 1', socket.connected);
socket.on('connect', function() {
  console.log('check 2', socket.connected);
});

socket.on('CELL_CLICK', msg => {
  store.dispatch({ type: 'CELL_CLICK', id: msg });

  const thunkRestartGame = () => (dispatch, getState) => {
    const { gameOver } = getState().tictactoe;
    if (gameOver) {
      console.log('GAME_OVER_START');
      dispatch({ type: 'GAME_OVER_START' });
      setTimeout(() => {
        console.log('emit to room nowa gra');
        emitToRoom('NEW_GAME');
      }, 3000);

      //todo: wszystkie emity trzeba chyba przerobic na io.in(room)...

      // show short animation, and update results
      // wait
      // emit restart

      //dispatch() cos...
      console.log('gra skończona, state: ', getState());
    }
  };

  store.dispatch(thunkRestartGame());
});

socket.on('NEW_GAME', () => {
  store.dispatch({ type: 'NEW_GAME' });
});

socket.on('PLAYER_JOINED_THE_ROOM', args => {
  console.log('before PLAYER_JOINED_THE_ROOM', store.getState());
  store.dispatch({ type: 'PLAYER_JOINED_THE_ROOM', args });
  console.log('after PLAYER_JOINED_THE_ROOM', store.getState());
  if (args.playersInRoom === 2) {
    store.dispatch({ type: 'NEW_GAME' });
  }
});

socket.on('PLAYER_DISCONNECTED', playersInRoom => {
  store.dispatch({ type: 'PLAYER_DISCONNECTED', playersInRoom });
  console.log('PLAYER_DISCONNECTED', playersInRoom);
});

const emitToRoom = (event, ...args) => {
  const inputRoom = store.getState().connection.inputRoom;

  if (inputRoom !== '') {
    socket.emit(event, inputRoom, ...args);
  }
};

export { socket, emitToRoom };
