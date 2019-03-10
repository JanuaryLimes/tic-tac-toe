import React, { Component } from 'react';
import Header from './header/Header';
import TicTacToe from './TicTacToe';
import Footer from './Footer';

export default class Main extends Component {
  render() {
    return (
      <div className="main-div">
        <Header />
        <TicTacToe />
        <Footer />
      </div>
    );
  }
}
