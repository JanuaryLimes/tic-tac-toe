import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ConnectionStatus extends Component {
  render() {
    const { tooltipText } = this.props;

    return (
      <span>
        <Tooltip title={tooltipText}>
          <span style={{ padding: '5px' }}>o</span>
        </Tooltip>
      </span>
    );
  }
}

ConnectionStatus.propTypes = {
  tooltipText: PropTypes.string
};

const mapStateToProps = state => {
  return {
    tooltipText: state.connection.tooltipText
  };
};

export default connect(mapStateToProps)(ConnectionStatus);
