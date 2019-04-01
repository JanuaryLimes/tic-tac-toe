import { combineReducers } from 'redux';
import { checkWinner, getAfterClickState } from './actions';

export const cross = 'cross';
export const circle = 'circle';

class Connection {
  constructor() {
    this.inputRoom = getDefaultId();
  }
}

class Game {
  constructor() {
    this.cells = getGameCells();
    this.turn = cross;
    this.gameOver = false;
    this.gameStarted = false;
    this.circleResult = 0;
    this.crossResult = 0;
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
  const cells = [];
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
      return {
        ...new Game(),
        gameStarted: true
      };
    case 'NEXT_ROUND':
      return {
        ...new Game(),
        gameStarted: true,
        circleResult: state.circleResult,
        crossResult: state.crossResult
      };
    case 'CELL_CLICK':
      return checkWinner(getAfterClickState(state, action));
    case 'PLAYER_DISCONNECTED':
    case 'ROOM_CONNECT_RESULT':
      return { ...new Game() };
    default:
      return state;
  }
};

const connection = (state = new Connection(), action) => {
  switch (action.type) {
    case 'ROOM_CONNECT_RESULT':
      return {
        ...state,
        ...action.data
      };
    case 'INPUT_ROOM_CHANGE':
      return { ...state, inputRoom: action.newRoom.target.value };
    case 'PLAYER_JOINED_THE_ROOM':
      return { ...state, ...action.args };
    case 'PLAYER_DISCONNECTED':
      return { ...state, playersInRoom: action.playersInRoom };
    default:
      return state;
  }
};

class Lang {
  constructor() {
    this.language = 'EN';
  }
}

const lang = (state = new Lang(), action) => {
  switch (action.type) {
    case 'LANGUAGE_CHANGE':
      return { ...state, language: action.language };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ tictactoe, connection, lang });
