import { combineReducers } from 'redux';
import { checkWinner, getAfterClickState } from './actions';

export const Player_X = 'Player_X';
export const Player_O = 'Player_O';

class Connection {
  constructor() {
    this.inputRoom = getDefaultId();
    this.connectedRoom = '';
    this.tooltipText = '';
  }
}

class Game {
  constructor() {
    this.cells = getGameCells();
    this.turn = Player_O;
    this.gameOver = false;
  }
}

const getDefaultId = () => {
  const id = function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random()
      .toString(36)
      .substr(2, 5);
  };

  return id();
};

const getGameCells = () => {
  let cells = [];
  for (let index = 1; index <= 9; index++) {
    cells.push(new Cell(index));
  }
  return cells;
};

export class Cell {
  constructor(id) {
    this.id = id;
    this.isUsed = false;
    this.value = '';
  }
}

const tictactoe = (state = new Game(), action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return new Game();
    case 'CELL_CLICK':
      const afterClick = getAfterClickState(state, action);
      return checkWinner(afterClick);
    default:
      return state;
  }
};

const connection = (state = new Connection(), action) => {
  switch (action.type) {
    case 'ROOM_CONNECT_RESULT':
      return {
        ...state,
        connectedRoom: action.data.connectedRoom,
        info: action.data.info,
        roomIsFull: action.data.roomIsFull
      };
    case 'INPUT_ROOM_CHANGE':
      return { ...state, inputRoom: action.newRoom.target.value };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ tictactoe, connection });
