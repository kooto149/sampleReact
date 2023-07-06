import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';

import { rootReducer, rootSaga } from '@modules/redux';

const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware, logger];
const middlewares = [sagaMiddleware];

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: false,
			serializableCheck: false,
		}).concat(...middlewares),
	// devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;
