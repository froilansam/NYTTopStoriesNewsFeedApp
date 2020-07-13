import React from 'react';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';

import utils from '~/utils';

import {
	closeLoading as closeLoadingAction,
	openLoading as openLoadingAction,
} from '../topstories.action';

const ArticleScreen = ({ navigation, route }) => {
	return (
		<>
			<WebView
				cacheEnabled
				cacheMode="LOAD_CACHE_ELSE_NETWORK"
				source={{ uri: _.get(route, 'params.article_url', null) }}
			/>

			<Button
				onPress={() => navigation.goBack()}
				style={{
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
				}}
			>
				<Text style={{ color: 'black', fontFamily: 'Cheltenham' }}>
					BACK
				</Text>
			</Button>
		</>
	);
};

ArticleScreen.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
	}).isRequired,
	route: PropTypes.shape().isRequired,
};

const mapDispatchToProps = {
	closeLoading: closeLoadingAction,
	openLoading: openLoadingAction,
};

export default utils.compose(connect(null, mapDispatchToProps))(ArticleScreen);
