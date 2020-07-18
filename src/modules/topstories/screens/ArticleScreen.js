import React from 'react';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';

import { View, Image } from 'react-native';
import utils from '~/utils';

import {
	closeLoading as closeLoadingAction,
	openLoading as openLoadingAction,
} from '../topstories.action';
import style from './ArticleScreen.style';

const loading = require('~/assets/images/loading.png');

const ArticleScreen = ({ navigation, route }) => {
	/**
	 * Webview for online articles when the user click the card.
	 */
	return (
		<>
			<WebView
				cacheEnabled
				cacheMode="LOAD_CACHE_ELSE_NETWORK"
				/**
				 * This will be shown if the article has not been cached and the network goes offline.
				 */
				renderError={() => (
					<View style={style.asWebViewErrorView}>
						<Image
							source={loading}
							style={style.asWebViewErrorLogo}
						/>
						<Text style={style.asWebViewErrorText}>
							You have no internet connection. This page has not
							been cached. Please connect to the internet.
						</Text>
					</View>
				)}
				source={{ uri: _.get(route, 'params.article_url', null) }}
			/>

			{/* Back button on webview */}
			<Button onPress={() => navigation.goBack()} style={style.asBack}>
				<Text style={style.asBackText}>BACK</Text>
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
