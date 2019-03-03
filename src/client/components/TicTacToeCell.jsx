import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emitToRoom } from '../socket.io/socket.io';

class TicTacToeCell extends Component {
  click(id) {
    const {
      ticTacToeCellClick,
      playerSide,
      gameStarted,
      gameOver,
      turn,
      cell
    } = this.props;

    if (gameStarted && !gameOver && playerSide === turn && !cell.value) {
      console.log('klik');
      ticTacToeCellClick(id);
    } else {
      console.log('pusty klik');
    }
  }
  render() {
    const { cell, id } = this.props;

    return (
      <div className="ttt-cell" onClick={() => this.click(id)}>
        <div className={['ttt-cell-element', cell.value].join(' ')}>
          <div className="show-cross" />
          <div className="show-circle" />
        </div>
      </div>
    );
  }
}

TicTacToeCell.propTypes = {
  cell: PropTypes.object,
  click: PropTypes.func,
  id: PropTypes.number
};

const mapStateToProps = state => ({
  gameStarted: state.tictactoe.gameStarted,
  gameOver: state.tictactoe.gameOver,
  playerSide: state.connection.playerSide,
  turn: state.tictactoe.turn
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
)(TicTacToeCell);
