import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ScoresAndTurn extends Component {
  render() {
    const { gameStarted, circleResult, crossResult } = this.props;
    return gameStarted ? (
      <div className="center header-turn-indicator">
        <div className={['icon-cross', this.getTurn()].join(' ')} />
        <div className="scores">
          <span>
            {crossResult} : {circleResult}
          </span>
        </div>
        <div className={['icon-circle', this.getTurn()].join(' ')} />
      </div>
    ) : (
      ''
    );
  }

  getTurn() {
    const { turn, gameOver } = this.props;
    if (gameOver) {
      return ' ';
    } else {
      return turn;
    }
  }
}

ScoresAndTurn.propTypes = {
  circleResult: PropTypes.number,
  crossResult: PropTypes.number,
  gameOver: PropTypes.bool,
  gameStarted: PropTypes.bool,
  turn: PropTypes.string
};

const mapStateToProps = state => {
  return {
    gameStarted: state.tictactoe.gameStarted,
    turn: state.tictactoe.turn,
    circleResult: state.tictactoe.circleResult,
    crossResult: state.tictactoe.crossResult,
    gameOver: state.tictactoe.gameOver
  };
};

export default connect(mapStateToProps)(ScoresAndTurn);
