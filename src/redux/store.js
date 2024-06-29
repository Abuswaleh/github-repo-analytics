// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reposReducer from './slices/repoSlice';
import repoDetailsReducer from './slices/repodetailsSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repos: reposReducer,
    repoDetails: repoDetailsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  // middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
