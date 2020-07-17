/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { View, Spinner } from 'native-base';
import PropTypes from 'prop-types';

import layout from '~/constants/layout';
import utils from '~/utils';

import ArticleScreen from '~/modules/topstories/screens/ArticleScreen';
import TopStoriesScreen from '~/modules/topstories/screens/TopStoriesScreen';

const loading = require('~/assets/images/loading.png');

const Root = createStackNavigator();

function RootNavigator({ auth }) {
	return (
		<>
			<Root.Navigator mode="modal">
				<Root.Screen
					component={TopStoriesScreen}
					name="TOP_STORIES_SCREEN"
					options={{
						headerShown: false,
					}}
				/>
				<Root.Screen
					component={ArticleScreen}
					name="ARTICLE_SCREEN"
					options={{
						headerShown: false,
					}}
				/>
			</Root.Navigator>
			{auth.isLoading && (
				<>
					<View
						style={{
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
						}}
					/>
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							width: layout.window.width,
							height: layout.window.height,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
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
