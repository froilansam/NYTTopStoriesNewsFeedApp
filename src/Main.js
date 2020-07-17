import { SplashScreen } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Root } from 'native-base';
import PropTypes from 'prop-types';

import RootNavigator from './navigation/RootNavigator';
import useLinking from './navigation/useLinking';

const roboto = require('native-base/Fonts/Roboto.ttf');
const robotoMedium = require('native-base/Fonts/Roboto_medium.ttf');
const spaceMono = require('./assets/fonts/SpaceMono-Regular.ttf');
const imperial = require('./assets/fonts/imperial.ttf');
const cheltenham = require('./assets/fonts/cheltenham-bold3.ttf');
const chomsky = require('./assets/fonts/Chomsky.otf');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

function Main(props) {
	const { skipLoadingScreen } = props;
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const [
		initialNavigationState,
		setInitialNavigationState,
	] = React.useState();
	const containerRef = React.useRef();
	const { getInitialState } = useLinking(containerRef);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load our initial navigation state
				setInitialNavigationState(await getInitialState());

				// Load fonts
				await Font.loadAsync({
					Roboto: roboto,
					Roboto_medium: robotoMedium,
					...Ionicons.font,
					'space-mono': spaceMono,
					Chomsky: chomsky,
					Cheltenham: cheltenham,
					Imperial: imperial,
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !skipLoadingScreen) {
		return null;
	}

	return (
		<Root>
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
				<StatusBar />
				<NavigationContainer
					ref={containerRef}
					initialState={initialNavigationState}
				>
					<RootNavigator />
				</NavigationContainer>
			</View>
		</Root>
	);
}

Main.propTypes = {
	skipLoadingScreen: PropTypes.bool,
};

Main.defaultProps = {
	skipLoadingScreen: false,
};

export default Main;
