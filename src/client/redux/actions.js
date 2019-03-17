import { cross, circle } from './reducers';

const animate = 'animate';

export const getAfterClickState = (state, action) => {
  if (state.cells.find(cell => cell.id === action.id).isUsed) {
    return state;
  }
  const newTurn = state.turn === circle ? cross : circle;
  const newVal = state.turn === circle ? circle : cross;
  const afterClick = {
    ...state,
    cells: state.cells.map(cell =>
      cell.id === action.id ? { ...cell, value: newVal, isUsed: true } : cell
    ),
    turn: newTurn
  };
  return afterClick;
};

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
];

const markWinningCells = (cells, combination) => {
  combination.forEach(id => {
    cells.find(cell => cell.id === id).animate = animate;
  });
  return cells;
};

export const checkWinner = afterClickState => {
  const cells = afterClickState.cells;

  const ooo = cells
    .filter(cell => cell.isUsed && cell.value === circle)
    .map(cell => cell.id);

  const xxx = cells
    .filter(cell => cell.isUsed && cell.value === cross)
    .map(cell => cell.id);

  let result = { ...afterClickState };

  winningCombinations.forEach(combination => {
    if (combination.every(index => ooo.indexOf(index) > -1)) {
      result = {
        ...afterClickState,
        gameOver: true,
        circleResult: afterClickState.circleResult + 1,
        cells: markWinningCells(cells, combination)
      };
    }
    if (combination.every(index => xxx.indexOf(index) > -1)) {
      result = {
        ...afterClickState,
        gameOver: true,
        crossResult: afterClickState.crossResult + 1,
        cells: markWinningCells(cells, combination)
      };
    }
  });

  if (cells.every(cell => cell.isUsed) && !result.gameOver) {
    result = {
      ...afterClickState,
      gameOver: true,
      tie: true
    };
  }

  return result;
};
