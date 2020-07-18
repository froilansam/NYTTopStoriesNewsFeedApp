import { AsyncStorage } from 'react-native';

import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

import { expo } from '../../app.json';

const { name } = expo;

/**
 * Instead of console.log, we can use logger for logging.
 */
const logger = Reactotron.configure({ name })
	.useReactNative()
	.use(reactotronRedux())
	.setAsyncStorageHandler(AsyncStorage);

export default logger;
