import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import promise from './promise';

import { persistStore, persistReducer } from 'redux-persist';

import persistConfig from './persistConfig';

function configureStore(onComplete) {
  const enhancer = applyMiddleware(thunk, promise);
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store, undefined, onComplete);
  return { store, persistor };
}

export default configureStore;