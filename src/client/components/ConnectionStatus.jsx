import React, { Component } from 'react';
import { CheckCircle, Warning } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ConnectionStatus extends Component {
  render() {
    const { info } = this.props;

    return (
      <div className="inline-block">
        <div style={{ paddingBottom: '8px', paddingLeft: '20px' }}>
          {this.statusIcon()}
          <div
            className="inline-block inline-middle"
            style={{ marginTop: '4px' }}
          >
            <div style={{ fontSize: '0.75rem', paddingLeft: '4px' }}>
              {info}
            </div>
          </div>
        </div>
      </div>
    );
  }

  statusIcon() {
    const { roomIsFull } = this.props;

    if (roomIsFull) {
      return <Warning className="inline-middle" style={{ color: 'red' }} />;
    }
    return (
      <CheckCircle className="inline-middle" style={{ color: '#31ff31' }} />
    );
  }
}

ConnectionStatus.propTypes = {
  tooltipText: PropTypes.string
};

const mapStateToProps = state => {
  return {
    info: state.connection.info,
    connectedRoom: state.connection.connectedRoom,
    inputRoom: state.connection.inputRoom,
    roomIsFull: state.connection.roomIsFull
  };
};

export default connect(mapStateToProps)(ConnectionStatus);
