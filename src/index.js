import React from 'react';
import ReactDOM from 'react-dom';
import Main from './client/components/Main';
import { Provider } from 'react-redux';
import './client/scss/tic-tac-toe.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import configureStore from './client/redux/configureStore';

const theme = createMuiTheme({
  palette: {
    type: 'dark' // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true }
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

var userLang = navigator.language || navigator.userLanguage;
if (userLang && userLang.toLowerCase().startsWith('pl')) {
  document.title = 'Kółko i krzyżyk';
}
