import { StyleSheet } from 'react-native';
import layout from '~/constants/layout';

export default StyleSheet.create({
	onlineHeader: {
		zIndex: 200,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 4,
		height: 160,
		backgroundColor: '#fff',
	},
	onlineHeaderTitle: {
		marginTop: 15,
		alignSelf: 'center',
		fontFamily: 'Chomsky',
		fontSize: 25,
	},
	onlineLineStyle: {
		height: 4,
		borderTopColor: '#8e8e8e',
		borderTopWidth: 0.6,
		width: '70%',
		marginTop: 10,
	},
	onlineFilterView: {
		position: 'absolute',
		bottom: 0,
		height: 100,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		zIndex: 0,
		width: layout.window.width,
	},
});
