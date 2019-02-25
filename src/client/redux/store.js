import { createStore } from 'redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);
/*const unsubscribe =*/ store.subscribe(() => console.log(store.getState()));

export { store };
