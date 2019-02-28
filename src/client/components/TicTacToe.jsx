import React, { Component } from 'react';
import TicTacToeCell from './TicTacToeCell';
import { connect } from 'react-redux';
import { emitToRoom } from '../socket.io/socket.io';
import PropTypes from 'prop-types';

class TicTacToe extends Component {
  render() {
    const { cells, ticTacToeCellClick, gameOver, gameOverInfo } = this.props;

    return (
      <div className="board-container">
        <div className="board">
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
  gameOverInfo: state.tictactoe.gameOverInfo
});

const mapDispatchToProps = dispatch => ({
  ticTacToeCellClick: id => {
    emitToRoom('CELL_CLICK', id);
    dispatch({ type: 'CELL_CLICK', id });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe);
