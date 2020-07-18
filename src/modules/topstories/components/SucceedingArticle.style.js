import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	saView: {
		backgroundColor: '#fff',
		elevation: 4,
		marginTop: 10,
		paddingTop: 10,
	},
	saByline: {
		fontFamily: 'Roboto',
		fontSize: 13,
		marginHorizontal: 10,
		marginTop: 10,
	},
	saTitle: {
		fontFamily: 'Cheltenham',
		fontSize: 25,
		marginHorizontal: 10,
		marginBottom: 5,
	},
	saAbstract: {
		fontFamily: 'Imperial',
		fontSize: 15,
		color: '#666666',
		marginHorizontal: 10,
		marginTop: 5,
	},
	saImageView: {
		flexDirection: 'column',
		width: '30%',
		padding: 10,
	},
	saImage: {
		width: 80,
		height: 80,
	},
});
