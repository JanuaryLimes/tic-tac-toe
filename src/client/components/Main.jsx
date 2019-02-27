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
      inputRoomChange
    } = this.props;

    const showChangeRoom = inputRoom !== connectedRoom;
    console.log('showChangeRoom', showChangeRoom);

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
