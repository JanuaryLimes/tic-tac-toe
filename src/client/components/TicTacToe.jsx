import React, { Component } from 'react';
import TicTacToeCell from './TicTacToeCell';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TicTacToe extends Component {
  render() {
    const { cells, gameOver, gameOverInfo } = this.props;

    return (
      <div className="board-container">
        <div className="board">
          {cells.map(cell => {
            return <TicTacToeCell key={cell.id} cell={cell} id={cell.id} />;
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
  gameOver: PropTypes.bool,
  gameOverInfo: PropTypes.string
};

const mapStateToProps = state => ({
  cells: state.tictactoe.cells,
  gameOver: state.tictactoe.gameOver,
  gameOverInfo: state.tictactoe.gameOverInfo
});

export default connect(mapStateToProps)(TicTacToe);
