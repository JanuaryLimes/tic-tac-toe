import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Main from './client/components/Main';
import './client/scss/tic-tac-toe.scss';
import { Provider } from 'react-redux';
import { store } from './client/redux/store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark' // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true }
});

// console.log(store().getState());

// const customMiddleWare = store => next => action => {
//   console.log('###store', store);
//   console.log('###next', next);
//   console.log('###action', action);
//   //console.log('Middleware triggered:', action);
//   next(action);
// };

ReactDOM.render(
  <div>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </Provider>

    {/* <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </Provider> */}
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
