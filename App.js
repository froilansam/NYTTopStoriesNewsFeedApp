import React from 'react';
import { Provider } from 'react-redux';

import { Root } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/store/configureStore';
import initialState from './src/store/initialState';
import Main from './src/Main';

const { persistor, store } = configureStore(initialState);

const App = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Root>
				<Main />
			</Root>
		</PersistGate>
	</Provider>
);

export default App;
