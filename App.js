import React from 'react';
import { Provider } from 'react-redux';

import { Root } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/store/configureStore';
import initialState from './src/store/initialState';
import Main from './src/Main';

const { persistor, store } = configureStore(initialState);

const App = () => (
	// Wrapping Main.js with redux for State Management
	// If you yarn install and using VSCode, you can press ctrl + click on components so
	// it will redirect you to the file.

	<Provider store={store}>
		{/* // This delays the rendering of your app's UI until your persisted
	// state has been retrieved and saved to redux. NOTE the PersistGate
	// loading prop can be null, or any react instance */}
		<PersistGate persistor={persistor}>
			<Root>
				<Main />
			</Root>
		</PersistGate>
	</Provider>
);

export default App;
