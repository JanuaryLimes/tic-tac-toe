import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoresAndTurn extends Component {
  render() {
    const { gameStarted, turn, circleResult, crossResult } = this.props;
    return gameStarted ? (
      <div className="center header-turn-indicator">
        <div className={['icon-cross', turn].join(' ')} />
        <div className="scores">
          <span>
            {crossResult} : {circleResult}
          </span>
        </div>
        <div className={['icon-circle', turn].join(' ')} />
      </div>
    ) : (
      ''
    );
  }
}

const mapStateToProps = state => {
  return {
    gameStarted: state.tictactoe.gameStarted,
    turn: state.tictactoe.turn,
    circleResult: state.tictactoe.circleResult,
    crossResult: state.tictactoe.crossResult
  };
};

export default connect(mapStateToProps)(ScoresAndTurn);
