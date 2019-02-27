import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TicTacToeCell extends Component {
  render() {
    const { cell, click, id } = this.props;

    return (
      <div className="ttt-cell" onClick={() => click(id)}>
        <div className={['ttt-cell-element', cell.value].join(' ')}>
          <div className="show-x">
            <div className="line-1">
              <div className="element-color" />
            </div>
            <div className="line-2">
              <div className="element-color" />
            </div>
          </div>
          <div className="show-o">
            <svg className="circle">
              <circle
                cx="50%"
                r="45%"
                cy="50%"
                stroke="white"
                strokeWidth="10%"
                fill="transparent"
              />
              Sorry, your browser does not support inline SVG.
            </svg>
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
