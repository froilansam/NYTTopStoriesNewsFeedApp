import { StyleSheet } from 'react-native';
import layout from '~/constants/layout';

export default StyleSheet.create({
	loadingView: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: layout.window.width,
		height: layout.window.height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black',
		opacity: 0.3,
	},
	loadingLogoView: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: layout.window.width,
		height: layout.window.height,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
