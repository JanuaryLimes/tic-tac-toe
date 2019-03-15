import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ConnectionStatus from './ConnectionStatus';
import { connect } from 'react-redux';
import ScoresAndTurn from './ScoresAndTurn';
import { withTranslation } from 'react-i18next';

class Header extends Component {
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
      inputRoom,
      connectToRoom,
      connectedRoom,
      inputRoomChange,
      playersInRoom,
      t
    } = this.props;

    const showChangeRoom = inputRoom !== connectedRoom;

    return (
      <div className="header">
        <div className="header-top">
          <TextField
            className="room-input"
            label={t('room id')}
            style={{ width: '65px' }}
            value={inputRoom}
            onChange={inputRoomChange}
            onKeyUp={e => {
              this.handleKeyUp(e);
            }}
            margin="dense"
            variant="standard"
          />
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
              {t('connect')}
            </Button>
          )}
          <ConnectionStatus />
        </div>
        {playersInRoom < 2 && (
          <div className="center header-wait-for-second-player">
            {t('Waiting for the second player')}
          </div>
        )}
        <ScoresAndTurn />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    connectedRoom: state.connection.connectedRoom,
    inputRoom: state.connection.inputRoom,
    playersInRoom: state.connection.playersInRoom,
    gameStarted: state.tictactoe.gameStarted
  };
};

const mapDispatchToProps = dispatch => ({
  connectToRoom: () => {
    dispatch({
      type: 'SOCKET',
      event: 'ROOM_CONNECT',
      args: [
        data => {
          dispatch({ type: 'ROOM_CONNECT_RESULT', data });
          dispatch((dispatch, getState) => {
            if (getState().connection.playersInRoom === 2) {
              dispatch({ type: 'NEW_GAME' });
            }
          });
        }
      ]
    });
  },
  inputRoomChange: newRoom => {
    dispatch({ type: 'INPUT_ROOM_CHANGE', newRoom });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Header));
