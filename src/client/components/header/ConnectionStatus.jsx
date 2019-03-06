import React, { Component } from 'react';
import { CheckCircle, Warning } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ConnectionStatus extends Component {
  render() {
    return (
      <div className="connection-status">
        {this.statusIcon()}
        <div className="connection-status-info">{this.getInfo()}</div>
      </div>
    );
  }

  getInfo() {
    const { connected, connectedRoom, roomIsFull } = this.props;

    if (connected) {
      return 'Połączono do pokoju ' + connectedRoom;
    } else {
      if (roomIsFull) {
        return 'Pokój jest pełny';
      } else {
        return 'hiuston mamy problem';
      }
    }
  }

  statusIcon() {
    const { roomIsFull } = this.props;

    if (roomIsFull) {
      return <Warning className="warning" />;
    }
    return <CheckCircle className="check-circle" />;
  }
}

ConnectionStatus.propTypes = {
  tooltipText: PropTypes.string
};

const mapStateToProps = state => {
  return {
    connectedRoom: state.connection.connectedRoom,
    roomIsFull: state.connection.roomIsFull,
    connected: state.connection.connected
  };
};

export default connect(mapStateToProps)(ConnectionStatus);
