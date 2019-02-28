import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Cross } from '../assets/cross.svg';
import { ReactComponent as Circle } from '../assets/circle.svg';

export default class TicTacToeCell extends Component {
  render() {
    const { cell, click, id } = this.props;

    return (
      <div className="ttt-cell" onClick={() => click(id)}>
        <div className={['ttt-cell-element', cell.value].join(' ')}>
          <div className="show-x">
            <Cross
              style={{ position: 'absolute', height: '100%', width: '100%' }}
            />
          </div>
          <div className="show-o">
            <Circle
              style={{ position: 'absolute', height: '100%', width: '100%' }}
            />
          </div>
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
