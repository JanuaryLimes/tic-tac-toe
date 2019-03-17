import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketMiddleWare } from '../socket.io/socketMiddleWare';
import { devConsole } from '../../utils';

export default function configureStore(preloadedState) {
  const middlewares = [thunk, socketMiddleWare];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  if (process.env.NODE_ENV !== 'production') {
    /*const unsubscribe =*/ store.subscribe(() => devConsole(store.getState()));
  }

  return store;
}
