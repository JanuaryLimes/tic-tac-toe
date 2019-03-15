import React, { Component } from 'react';
import { CheckCircle, Warning } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

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
    const { connected, connectedRoom, roomIsFull, t } = this.props;

    if (connected) {
      return t('connected to room', { roomId: connectedRoom });
    } else {
      if (roomIsFull) {
        return t('room is full');
      } else {
        return t('houston');
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

export default connect(mapStateToProps)(withTranslation()(ConnectionStatus));
