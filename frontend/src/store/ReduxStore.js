import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';
import { reducers } from '../reducers';

function saveToLocalStorage(store) {
  try {
    const serializaedStore = JSON.stringify(store);
    window.localStorage.setItem('store', serializaedStore);
  } catch (error) {
    console.log(error);
  }
}

function loadFormLocalStorage() {
  try {
    const serializaedStore = window.localStorage.getItem('store');
    if (serializaedStore === null) return undefined;
    return JSON.parse(serializaedStore);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFormLocalStorage();

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
