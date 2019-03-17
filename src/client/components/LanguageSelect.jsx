import React, { Component } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import i18next from 'i18next';
import PropTypes from 'prop-types';

class LanguageSelect extends Component {
  render() {
    const { language } = this.props;
    return (
      <div className="language-select-container">
        <div className="center-container">
          <Select value={language} onChange={e => this.handleChange(e)}>
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="pl">PL</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
  handleChange(e) {
    const { changeLanguage, language } = this.props;
    const newLang = e.target.value;
    if (language !== newLang) {
      changeLanguage(newLang);
      i18next.changeLanguage(newLang);
    }
  }
}

LanguageSelect.propTypes = {
  changeLanguage: PropTypes.func,
  language: PropTypes.string
};

const mapStateToProps = state => ({
  language: state.lang.language
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: language => {
    dispatch({ type: 'LANGUAGE_CHANGE', language });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelect);
