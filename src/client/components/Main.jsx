import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TicTacToe from './TicTacToe';
import { connect } from 'react-redux';
import { emitToRoom } from '../socket.io/socket.io';
import PropTypes from 'prop-types';
import ConnectionStatus from './ConnectionStatus';
import { store } from '../redux/store';

class Main extends Component {
  componentDidMount() {
    this.props.connectToRoom();
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.props.connectToRoom();
    }
  }

  render() {
    const {
      //newGameClick,
      inputRoom,
      connectToRoom,
      connectedRoom,
      inputRoomChange,
      playersInRoom,
      gameStarted,
      turn
    } = this.props;

    const showChangeRoom = inputRoom !== connectedRoom;

    return (
      <div className="main-div">
        <div className="header">
          <div className="header-top">
            <div className="inline-block">
              <TextField
                className="room-input"
                label="Pokój"
                style={{ width: '60px' }}
                value={inputRoom}
                onChange={inputRoomChange}
                onKeyUp={e => {
                  this.handleKeyUp(e);
                }}
                margin="dense"
                variant="standard"
              />
            </div>
            {showChangeRoom && (
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginBottom: '3px',
                  marginLeft: '5px',
                  marginRight: '5px'
                }}
                onClick={() => connectToRoom()}
              >
                Połącz
              </Button>
            )}
            <ConnectionStatus />
          </div>
          {playersInRoom < 2 && (
            <div className="center header-wait-for-second-player">
              Oczekiwanie na drugiego gracza
            </div>
          )}
          {gameStarted && (
            <div className="center header-turn-indicator">
              <div className={['icon-cross', turn].join(' ')} />
              <div className={['icon-circle', turn].join(' ')} />
            </div>
          )}
        </div>
        <TicTacToe />
        <div className="footer">
          <div>
            Icons made by{' '}
            <a
              href="https://www.flaticon.com/authors/roundicons"
              title="Roundicons"
              rel="noopener noreferrer"
            >
              Roundicons
            </a>{' '}
            from{' '}
            <a
              href="https://www.flaticon.com/"
              rel="noopener noreferrer"
              title="Flaticon"
            >
              www.flaticon.com
            </a>{' '}
            is licensed by{' '}
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC 3.0 BY
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  newGameClick: PropTypes.func,
  inputRoom: PropTypes.string,
  connectToRoom: PropTypes.func,
  inputRoomChange: PropTypes.func
};

const mapStateToProps = state => {
  return {
    connectedRoom: state.connection.connectedRoom,
    inputRoom: state.connection.inputRoom,
    playersInRoom: state.connection.playersInRoom,
    gameStarted: state.tictactoe.gameStarted,
    turn: state.tictactoe.turn
  };
};

const mapDispatchToProps = dispatch => ({
  newGameClick: () => {
    emitToRoom('NEW_GAME');
    dispatch({ type: 'NEW_GAME' });
  },
  connectToRoom: () => {
    emitToRoom('ROOM_CONNECT', data => {
      dispatch({ type: 'ROOM_CONNECT_RESULT', data });
      const state = store.getState();
      if (state.connection.playersInRoom === 2) {
        dispatch({ type: 'NEW_GAME' });
      }
    });
  },
  inputRoomChange: newRoom => {
    dispatch({ type: 'INPUT_ROOM_CHANGE', newRoom });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
