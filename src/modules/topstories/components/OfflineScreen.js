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

import layout from '~/constants/layout';
import utils from '~/utils';
import FirstArticle from './FirstArticle';
import SucceedingArticle from './SucceedingArticle';

const loading = require('~/assets/images/loading.png');

const OfflineScreen = ({
	auth,
	handleSaveUnsaveArticle,
	isConnected,
	navigation,
}) => {
	const scrollYAnimatedValue = new Animated.Value(0);
	const diffClamp = Animated.diffClamp(
		scrollYAnimatedValue,
		0,
		isConnected ? 160 : 80,
	);

	const headerAnimation = diffClamp.interpolate({
		inputRange: [0, isConnected ? 160 : 80],
		outputRange: [0, isConnected ? -160 : -80],
	});

	return (
		<>
			{_.get(auth, 'offlineArticles', []).length <= 0 && (
				<View
					style={{
						height: layout.window.height,
						width: layout.window.width,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Image
						source={loading}
						style={{
							width: 62,
							height: 80,
							marginBottom: 10,
						}}
					/>
					<Text
						style={{
							marginTop: 0,
							alignSelf: 'center',
							fontFamily: 'Chomsky',
							fontSize: 15,
						}}
					>
						No offline articles
					</Text>
				</View>
			)}
			<ScrollView
				contentContainerStyle={{ paddingTop: 80 }}
				contentInsetAdjustmentBehavior="automatic"
				onScroll={Animated.event([
					{
						nativeEvent: {
							contentOffset: { y: scrollYAnimatedValue },
						},
					},
				])}
				scrollEventThrottle={16}
			>
				{_.get(auth, 'offlineArticles', []).length > 0 &&
					_.get(auth, 'offlineArticles', []).map((article, index) => {
						if (index === 0)
							return (
								<FirstArticle
									article={article}
									handleSaveUnsaveArticle={
										handleSaveUnsaveArticle
									}
									navigation={navigation}
								/>
							);
						return null;
					})}

				<FlatList
					data={_.get(auth, 'offlineArticles', [])}
					keyExtractor={(item) => item.id}
					renderItem={({ index, item }) => (
						<SucceedingArticle
							handleSaveUnsaveArticle={handleSaveUnsaveArticle}
							index={index}
							item={item}
							navigation={navigation}
						/>
					)}
				/>
			</ScrollView>
			<Animated.View
				style={{
					transform: [{ translateY: headerAnimation }],
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
				}}
			>
				<Text
					style={{
						marginTop: 0,
						alignSelf: 'center',
						fontFamily: 'Chomsky',
						fontSize: 25,
					}}
				>
					The New York Times
				</Text>
				<Text
					style={{
						marginTop: 0,
						alignSelf: 'center',
						fontSize: 12,
						fontFamily: 'Imperial',
					}}
				>
					Offline
				</Text>
			</Animated.View>
		</>
	);
};

OfflineScreen.propTypes = {
	auth: PropTypes.shape().isRequired,
	handleSaveUnsaveArticle: PropTypes.func.isRequired,
	isConnected: PropTypes.bool.isRequired,
	navigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default utils.compose(connect(mapStateToProps))(OfflineScreen);
