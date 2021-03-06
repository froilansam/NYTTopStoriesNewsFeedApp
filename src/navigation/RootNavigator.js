/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { View, Spinner } from 'native-base';
import PropTypes from 'prop-types';

import utils from '~/utils';

import ArticleScreen from '~/modules/topstories/screens/ArticleScreen';
import TopStoriesScreen from '~/modules/topstories/screens/TopStoriesScreen';
import style from './RootNavigator.style';

const loading = require('~/assets/images/loading.png');

const Root = createStackNavigator();

function RootNavigator({ auth }) {
	return (
		<>
			<Root.Navigator mode="modal">
				{/* Stack Navigator for Top Stories Screen */}
				<Root.Screen
					component={TopStoriesScreen}
					name="TOP_STORIES_SCREEN"
					options={{
						headerShown: false,
					}}
				/>
				{/* Stack Navigator for Article Screen */}
				<Root.Screen
					component={ArticleScreen}
					name="ARTICLE_SCREEN"
					options={{
						headerShown: false,
					}}
				/>
			</Root.Navigator>

			{/* This the loading component on the top of the navigator */}
			{auth.isLoading && (
				<>
					<View style={style.loadingView} />
					<View style={style.loadingLogoView}>
						<Image
							source={loading}
							style={{ width: 62, height: 80 }}
						/>
						<Spinner color="black" />
					</View>
				</>
			)}
		</>
	);
}

RootNavigator.propTypes = {
	auth: PropTypes.shape({
		isLoggedIn: PropTypes.bool,
		isLoading: PropTypes.bool,
	}).isRequired,
	focused: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default utils.compose(connect(mapStateToProps))(RootNavigator);
