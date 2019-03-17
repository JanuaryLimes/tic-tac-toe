import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { devConsole } from '../../utils';

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
      devConsole('klik');
      ticTacToeCellClick(id);
    } else {
      devConsole('pusty klik');
    }
  }
  render() {
    const { cell, id } = this.props;

    return (
      <div className="ttt-cell" onClick={() => this.click(id)}>
        <div
          className={['ttt-cell-element', cell.value, cell.animate].join(' ')}
        >
          <div className="show-cross" />
          <div className="show-circle" />
        </div>
      </div>
    );
  }
}

TicTacToeCell.propTypes = {
  cell: PropTypes.object,
  gameOver: PropTypes.bool,
  gameStarted: PropTypes.bool,
  id: PropTypes.number,
  playerSide: PropTypes.string,
  ticTacToeCellClick: PropTypes.func,
  turn: PropTypes.string
};

const mapStateToProps = state => ({
  gameStarted: state.tictactoe.gameStarted,
  gameOver: state.tictactoe.gameOver,
  playerSide: state.connection.playerSide,
  turn: state.tictactoe.turn
});

const mapDispatchToProps = dispatch => ({
  ticTacToeCellClick: id => {
    dispatch({ type: 'SOCKET', event: 'CELL_CLICK', args: [id] });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToeCell);
