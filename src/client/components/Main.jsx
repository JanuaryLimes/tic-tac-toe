import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TicTacToe from './TicTacToe';
import { connect } from 'react-redux';
import { emitToRoom } from '../socket.io/socket.io';
import PropTypes from 'prop-types';
import ConnectionStatus from './ConnectionStatus';

// https://material-ui.com/getting-started/usage/
// https://cssgradient.io/

class Main extends Component {
  render() {
    const {
      //newGameClick,
      inputRoom,
      connectToRoom,
      inputRoomChange
    } = this.props;

    return (
      <div className="main-div">
        <div className="header">
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => newGameClick()}
          >
            Nowa gra
          </Button> */}

          <span style={{ paddingLeft: '5px', paddingRight: '5px' }}>
            <TextField
              className="room-input"
              label="Pokój"
              style={{ width: '100px' }}
              value={inputRoom}
              onChange={inputRoomChange}
              margin="dense"
              variant="standard"
            />
            <ConnectionStatus />
          </span>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '17px' }}
            onClick={() => connectToRoom()}
          >
            Zmien pokój
          </Button>
        </div>
        <TicTacToe />
        <div className="footer" />
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
    inputRoom: state.connection.inputRoom
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
      if (!data.connected) {
        alert(data.info);
        console.log(data.info);
      } else {
        console.log(data.info);
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
