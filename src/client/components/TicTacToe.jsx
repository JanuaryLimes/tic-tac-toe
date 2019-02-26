import React, { Component } from 'react';
import TicTacToeCell from './TicTacToeCell';
import { connect } from 'react-redux';
import { emitToRoom } from '../socket.io/socket.io';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

class TicTacToe extends Component {
  onResize = (width, height) => {
    const size = Math.min(width, height);
    this.props.handleBoardSizeChange(size);
  };

  render() {
    const {
      cells,
      ticTacToeCellClick,
      gameOver,
      gameOverInfo,
      boardSize
    } = this.props;

    return (
      <div className="board-container">
        <div className="board" style={{ width: boardSize, height: boardSize }}>
          {cells.map(cell => {
            return (
              <TicTacToeCell
                key={cell.id}
                cell={cell}
                id={cell.id}
                click={ticTacToeCellClick}
              />
            );
          })}
          {gameOver && (
            <div className="info">
              <div className="info-banner">
                <span className="info-text">{gameOverInfo}</span>
              </div>
            </div>
          )}
        </div>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </div>
    );
  }
}

TicTacToe.propTypes = {
  cells: PropTypes.array,
  ticTacToeCellClick: PropTypes.func,
  gameOver: PropTypes.bool,
  gameOverInfo: PropTypes.string
};

const mapStateToProps = state => ({
  cells: state.tictactoe.cells,
  gameOver: state.tictactoe.gameOver,
  gameOverInfo: state.tictactoe.gameOverInfo,
  boardSize: state.tictactoe.boardSize
});

const mapDispatchToProps = dispatch => ({
  ticTacToeCellClick: id => {
    emitToRoom('CELL_CLICK', id);
    dispatch({ type: 'CELL_CLICK', id });
  },
  handleBoardSizeChange: boardSize => {
    dispatch({ type: 'BOARD_SIZE_CHANGE', boardSize });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe);
