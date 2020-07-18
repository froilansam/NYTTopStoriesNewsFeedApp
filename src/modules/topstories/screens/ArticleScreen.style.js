import { StyleSheet } from 'react-native';
import layout from '~/constants/layout';

export default StyleSheet.create({
	asWebViewErrorView: {
		height: layout.window.height,
		width: layout.window.width,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		backgroundColor: '#fff',
	},
	asWebViewErrorLogo: {
		width: 62,
		height: 80,
		marginBottom: 10,
	},
	asWebViewErrorText: {
		marginTop: 0,
		alignSelf: 'center',
		fontFamily: 'Chomsky',
		fontSize: 15,
		width: '70%',
		textAlign: 'center',
	},
	asBack: {
		backgroundColor: '#fff',
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: 15,
		position: 'absolute',
		bottom: 20,
		left: 100,
		right: 0,
		height: 50,
		width: 150,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
	},
	asBackText: { color: 'black', fontFamily: 'Cheltenham' },
});
