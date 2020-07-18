import { StyleSheet } from 'react-native';
import layout from '~/constants/layout';

export default StyleSheet.create({
	firstArticleView: { backgroundColor: '#fff', elevation: 4 },
	firstArticleImage: {
		width: layout.window.width,
		height: 200,
	},
	faByline: {
		fontFamily: 'Roboto',
		fontSize: 15,
		marginHorizontal: 10,
		marginTop: 10,
	},
	faTitle: {
		fontFamily: 'Cheltenham',
		fontSize: 30,
		marginHorizontal: 10,
		marginBottom: 10,
	},
	faAbstract: {
		fontFamily: 'Imperial',
		fontSize: 15,
		color: '#666666',
		margin: 10,
	},
	faArticleFooterView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},

	faDate: {
		fontFamily: 'Imperial',
		fontSize: 15,
		color: '#666666',
		marginHorizontal: 10,
		marginBottom: 10,
		alignSelf: 'flex-start',
	},
	faDownloadView: {
		justifyContent: 'flex-end',
		flexDirection: 'row',
		marginBottom: 10,
	},
});
