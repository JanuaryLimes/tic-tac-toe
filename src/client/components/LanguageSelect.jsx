import React, { Component } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class LanguageSelect extends Component {
  render() {
    const { language, t } = this.props;
    return (
      <div className="language-select-container">
        <div className="center-container">
          <Select value={language} onChange={e => this.handleChange(e)}>
            <MenuItem value="EN">EN</MenuItem>
            <MenuItem value="PL">PL</MenuItem>
          </Select>
        </div>
        <div>{t('title')}</div>
      </div>
    );
  }
  handleChange(e) {
    const { changeLanguage, language } = this.props;
    const newLang = e.target.value;
    if (language !== newLang) {
      changeLanguage(newLang);
    }
  }
}

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
)(withTranslation()(LanguageSelect));
