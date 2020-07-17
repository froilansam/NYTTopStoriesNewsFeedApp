import { StyleSheet } from 'react-native';
import layout from '~/constants/layout';

export default StyleSheet.create({
	offlineView: {
		height: layout.window.height,
		width: layout.window.width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	offlineLogo: {
		width: 62,
		height: 80,
		marginBottom: 10,
	},
	offlineText: {
		marginTop: 0,
		alignSelf: 'center',
		fontFamily: 'Chomsky',
		fontSize: 15,
	},
	offlineHeader: {
		zIndex: 200,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 4,
		height: 80,
		backgroundColor: '#fff',
	},
	offlineHeaderTitle: {
		marginTop: 0,
		alignSelf: 'center',
		fontFamily: 'Chomsky',
		fontSize: 25,
	},
	offlineHeaderSubtext: {
		marginTop: 0,
		alignSelf: 'center',
		fontSize: 12,
		fontFamily: 'Imperial',
	},
});
