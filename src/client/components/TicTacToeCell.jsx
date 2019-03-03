import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TicTacToeCell extends Component {
  render() {
    const { cell, click, id } = this.props;

    return (
      <div className="ttt-cell" onClick={() => click(id)}>
        <div className={['ttt-cell-element', cell.value].join(' ')}>
          <div className="show-x" />
          <div className="show-o" />
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
