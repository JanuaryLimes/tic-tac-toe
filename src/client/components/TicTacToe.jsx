import React, { Component } from 'react';
import TicTacToeCell from './TicTacToeCell';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

class TicTacToe extends Component {
  render() {
    const { cells, tie, t } = this.props;

    return (
      <div className="board-container">
        <div className="board">
          {cells.map(cell => {
            return <TicTacToeCell key={cell.id} cell={cell} id={cell.id} />;
          })}
          {tie && (
            <div className="info">
              <div className="info-banner">
                <span className="info-text">{t('tie')}</span>
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
  t: PropTypes.func,
  tie: PropTypes.bool
};

const mapStateToProps = state => ({
  cells: state.tictactoe.cells,
  tie: state.tictactoe.tie
});

export default connect(mapStateToProps)(withTranslation()(TicTacToe));
