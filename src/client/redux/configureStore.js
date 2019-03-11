import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { createSocket } from '../socket.io/socket.io';

const socketMiddleWare = store => {
  const socket = createSocket(store);
  return next => action => {
    if (action.type === 'SOCKET') {
      let room = '';
      let conn = store.getState().connection;
      if (action.event === 'ROOM_CONNECT') {
        room = conn.inputRoom;
      } else {
        room = conn.connectedRoom;
      }
      socket.emit(action.event, room, ...(action.args || []));
    } else {
      next(action);
    }
  };
};

export default function configureStore(preloadedState) {
  const middlewares = [thunk, socketMiddleWare];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  if (process.env.NODE_ENV !== 'production') {
    /*const unsubscribe =*/ store.subscribe(() =>
      console.log(store.getState())
    );
  }

  return store;
}
