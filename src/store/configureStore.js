import { AsyncStorage } from 'react-native'; // Storage for state

/**
 * Creates a Redux store that holds the complete state tree of your app.
 * There should only be a single store in your app.
 */

/**
 * Composes functions from right to left.
 */

/**
 * applyMiddleware if i want to extend the function nality
 */
import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

/**
 * Thunk is another term for function that's return by another function instead of action.
 */
import thunk from 'redux-thunk';

import Reactotron from '../logger';
import rootReducer from './reducers';

const persistedReducer = persistReducer(
	{
		key: 'root',
		storage: AsyncStorage,
		/**
		 * autoMergeLevel2 (import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2') This acts just like autoMergeLevel1, except it shallow merges two levels
		 * incoming state: { foo: incomingFoo }
		 * initial state: { foo: initialFoo, bar: initialBar }
		 * reconciled state: { foo: mergedFoo, bar: initialBar } // note: initialFoo and incomingFoo are shallow merged
		 */
		/**
		 * State reconcilers define how incoming state is merged in with initial state.
		 */
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
