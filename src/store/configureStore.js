import { AsyncStorage } from 'react-native';

import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import Reactotron from '../logger';
import rootReducer from './reducers';

const persistedReducer = persistReducer(
	{
		key: 'root',
		storage: AsyncStorage,
		stateReconciler: autoMergeLevel2,
	},
	rootReducer,
);

let middleware = [thunk];
let persistor = null;
let store = null;

export default function configureStore(initialState) {
	let composedMiddleware = null;

	// eslint-disable-next-line no-undef
	if (__DEV__) {
		const logger = createLogger({ collapsed: true });
		middleware = [...middleware, logger];

		Reactotron.connect();

		composedMiddleware = compose(
			applyMiddleware(...middleware),
			Reactotron.createEnhancer(),
		);
	} else {
		composedMiddleware = applyMiddleware(...middleware);
	}

	store = createStore(persistedReducer, initialState, composedMiddleware);
	persistor = persistStore(store);

	return { store, persistor };
}
