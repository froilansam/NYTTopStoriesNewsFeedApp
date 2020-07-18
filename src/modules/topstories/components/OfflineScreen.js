import React from 'react';
import {
	View,
	Image,
	Text,
	Animated,
	ScrollView,
	FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';

import utils from '~/utils';

import {
	saveArticle as saveArticleAction,
	deleteArticle as deleteArticleAction,
} from '../topstories.action';
import { handleSaveUnsaveArticle } from '../topstories.library';

import FirstArticle from './FirstArticle';
import style from './OfflineScreen.style';
import SucceedingArticle from './SucceedingArticle';

const loading = require('~/assets/images/loading.png');

const OfflineScreen = ({
	auth,
	deleteArticle,
	isConnected,
	navigation,
	saveArticle,
}) => {
	const offlineArticles = _.get(auth, 'offlineArticles', []);
	const scrollYAnimatedValue = new Animated.Value(0);

	/** These functions are for the header animation. */
	const diffClamp = Animated.diffClamp(
		scrollYAnimatedValue,
		0,
		isConnected ? 160 : 80,
	);

	const headerAnimation = diffClamp.interpolate({
		inputRange: [0, isConnected ? 160 : 80],
		outputRange: [0, isConnected ? -160 : -80],
	});

	// This is the offline component
	return (
		<>
			{/* This is shown when no articles are saved offline */}
			{offlineArticles.length <= 0 && (
				<View style={style.offlineView}>
					<Image source={loading} style={style.offlineLogo} />
					<Text style={style.offlineText}>No offline articles</Text>
				</View>
			)}
			<ScrollView
				contentContainerStyle={{ paddingTop: 80 }}
				contentInsetAdjustmentBehavior="automatic"
				/**
				 * This event animates header
				 */
				onScroll={Animated.event([
					{
						nativeEvent: {
							contentOffset: { y: scrollYAnimatedValue },
						},
					},
				])}
				scrollEventThrottle={16}
			>
				{offlineArticles.length > 0 &&
					offlineArticles.map((article, index) => {
						if (index === 0)
							return (
								/**
								 * This is the First Article Component
								 */
								<FirstArticle
									article={article}
									handleSaveUnsaveArticle={() => {
										return handleSaveUnsaveArticle(
											article,
											deleteArticle,
											offlineArticles,
											saveArticle,
										);
									}}
									navigation={navigation}
								/>
							);
						return null;
					})}

				{/* This is the mapping of succeeding articles */}
				<FlatList
					data={offlineArticles}
					keyExtractor={(item) => item.id}
					renderItem={({ index, item: article }) => (
						<SucceedingArticle
							handleSaveUnsaveArticle={() => {
								return handleSaveUnsaveArticle(
									article,
									deleteArticle,
									offlineArticles,
									saveArticle,
								);
							}}
							index={index}
							item={article}
							navigation={navigation}
						/>
					)}
				/>
			</ScrollView>

			{/* The animated header */}
			<Animated.View
				style={[
					{
						transform: [{ translateY: headerAnimation }],
					},
					style.offlineHeader,
				]}
			>
				<Text style={style.offlineHeaderTitle}>The New York Times</Text>
				<Text style={style.offlineHeaderSubtext}>Offline</Text>
			</Animated.View>
		</>
	);
};

OfflineScreen.propTypes = {
	auth: PropTypes.shape().isRequired,
	deleteArticle: PropTypes.func.isRequired,
	isConnected: PropTypes.bool.isRequired,
	navigation: PropTypes.shape({}).isRequired,
	saveArticle: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
	deleteArticle: deleteArticleAction,
	saveArticle: saveArticleAction,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default utils.compose(connect(mapStateToProps, mapDispatchToProps))(
	OfflineScreen,
);
