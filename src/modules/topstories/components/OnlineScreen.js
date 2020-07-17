/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { ScrollView, Animated, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Icon, Button, ActionSheet } from 'native-base';
import PropTypes from 'prop-types';

import sections from '~/constants/sections';
import utils from '~/utils';

import {
	closeLoading as closeLoadingAction,
	openLoading as openLoadingAction,
	getArticles as getArticlesAction,
} from '../topstories.action';

import FirstArticle from './FirstArticle';
import {
	defaultErrorHandler,
	show,
} from '~/modules/notification/notification.library';
import SectionButton from './SectionButton';
import SucceedingArticle from './SucceedingArticle';
import layout from '~/constants/layout';

const OnlineScreen = ({
	articles,
	auth,
	closeLoading,
	getArticles,
	handleSaveUnsaveArticle,
	handleSection,
	isConnected,
	keywords,
	locations,
	navigation,
	openLoading,
	selectedKeywords,
	selectedLocations,
	setArticles,
	setKeywords,
	setLocations,
	setSelectedKeywords,
	setSelectedLocations,
}) => {
	let renderArticles = [...articles];
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

	const refresh = () => {
		openLoading();
		getArticles(_.get(auth, 'selectedSection', null))
			.then((data) => {
				closeLoading();

				const articlesInfo = data.data.results.map((art, index) => {
					return {
						...art,
						id: index,
					};
				});
				const locationsChoices = articlesInfo.reduce((acc, art) => {
					const geo = _.get(art, 'geo_facet', []).sort((a, b) => {
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					});
					const accumulator = [...acc];
					if (geo.length > 0) {
						const geoMapped = geo.reduce(
							(accu, geoInfo) => {
								const included = accu.find(
									(single) => single.geoInfo === geoInfo,
								);

								if (!included) {
									return accu.concat({
										id: accu.length + 1,
										geoInfo,
									});
								}
								return accu;
							},
							[...accumulator],
						);

						return geoMapped;
					}
					return accumulator;
				}, []);

				const keywordsChoices = articlesInfo.reduce((acc, art) => {
					const des = _.get(art, 'des_facet', []).sort((a, b) => {
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					});

					const accumulator = [...acc];
					if (des.length > 0) {
						const desMapped = des.reduce(
							(accu, desInfo) => {
								const included = accu.find(
									(single) => single.desInfo === desInfo,
								);

								if (!included) {
									return accu.concat({
										id: accu.length + 1,
										desInfo,
									});
								}
								return accu;
							},
							[...accumulator],
						);

						return desMapped;
					}
					return accumulator;
				}, []);

				setLocations(locationsChoices);
				setKeywords(keywordsChoices);
				setArticles(articlesInfo);

				show('Section has been refreshed.');
			})
			.catch((err) => {
				closeLoading();
				defaultErrorHandler(null, err);
			});
	};

	if (selectedLocations || selectedKeywords) {
		renderArticles = articles.reduce((acc, art) => {
			if (
				art.geo_facet.includes(selectedLocations) ||
				art.des_facet.includes(selectedKeywords)
			) {
				return acc.concat(art);
			}
			return acc;
		}, []);
	}

	return (
		<>
			<ScrollView
				contentContainerStyle={{ paddingTop: 160 }}
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
				{renderArticles.length > 0 &&
					renderArticles.map((article, index) => {
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
					data={renderArticles}
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
					height: 160,
					backgroundColor: '#fff',
				}}
			>
				<Text
					style={{
						marginTop: 15,
						alignSelf: 'center',
						fontFamily: 'Chomsky',
						fontSize: 25,
					}}
				>
					The New York Times
				</Text>

				<Icon
					name="reload"
					onPress={() => refresh()}
					style={{
						position: 'absolute',
						right: 10,
						top: 20,
					}}
					type="MaterialCommunityIcons"
				/>

				<View
					style={{
						height: 4,
						borderTopColor: '#8e8e8e',
						borderTopWidth: 0.6,
						width: '70%',
						marginTop: 10,
					}}
				/>
				<ScrollView horizontal>
					{sections.map((section, index) => {
						if (index % 2 === 0) {
							return (
								<SectionButton
									bottom={sections[index + 1]}
									handleSection={handleSection}
									top={section}
								/>
							);
						}

						return null;
					})}
				</ScrollView>
			</Animated.View>
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					height: 100,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					zIndex: 0,
					width: layout.window.width,
				}}
			>
				<Button
					onPress={() => {
						ActionSheet.show(
							{
								options: keywords
									.map((keyword) => keyword.desInfo)
									.concat('Cancel'),
								cancelButtonIndex: keywords.length,
								title: 'Keywords',
							},
							(buttonIndex) => {
								if (buttonIndex === keywords.length) {
									return setSelectedKeywords(null);
								}
								const selected = keywords.find(
									(keyword) => keyword.id === buttonIndex + 1,
								);

								setSelectedKeywords(selected.desInfo);
							},
						);
					}}
					style={{
						backgroundColor: '#fff',
						borderColor: 'black',
						borderWidth: 2,
						borderRadius: 15,

						height: 50,
						width: 150,
						flexDirection: 'row',
						justifyContent: 'space-between',
						elevation: 5,
						zIndex: 100,
					}}
				>
					<Text
						style={{
							color: 'black',
							fontFamily: 'Cheltenham',
							paddingLeft: 20,
						}}
					>
						{_.truncate(selectedKeywords, {
							length: 12,
							ommission: '...',
						}) || 'KEYWORDS'}
					</Text>
					<Icon
						name="chevron-up"
						style={{ color: 'black' }}
						type="MaterialCommunityIcons"
					/>
				</Button>
				<Button
					onPress={() => {
						ActionSheet.show(
							{
								options: locations
									.map((location) => location.geoInfo)
									.concat('Cancel'),
								cancelButtonIndex: locations.length,
								title: 'Locations',
							},
							(buttonIndex) => {
								if (buttonIndex === locations.length) {
									return setSelectedLocations(null);
								}
								const selected = locations.find(
									(location) =>
										location.id === buttonIndex + 1,
								);

								setSelectedLocations(selected.geoInfo);
							},
						);
					}}
					style={{
						backgroundColor: '#fff',
						borderColor: 'black',
						borderWidth: 2,
						borderRadius: 15,
						height: 50,
						width: 150,
						flexDirection: 'row',
						justifyContent: 'space-between',
						elevation: 5,
					}}
				>
					<Text
						style={{
							color: 'black',
							fontFamily: 'Cheltenham',
							paddingLeft: 20,
						}}
					>
						{_.truncate(selectedLocations, {
							length: 12,
							ommission: '...',
						}) || 'LOCATIONS'}
					</Text>
					<Icon
						name="chevron-up"
						style={{ color: 'black' }}
						type="MaterialCommunityIcons"
					/>
				</Button>
			</View>
		</>
	);
};

OnlineScreen.propTypes = {
	articles: PropTypes.array.isRequired,
	auth: PropTypes.shape().isRequired,
	closeLoading: PropTypes.func.isRequired,
	getArticles: PropTypes.func.isRequired,
	handleSaveUnsaveArticle: PropTypes.func.isRequired,
	handleSection: PropTypes.func.isRequired,
	isConnected: PropTypes.bool.isRequired,
	keywords: PropTypes.array.isRequired,
	locations: PropTypes.array.isRequired,
	navigation: PropTypes.shape({}).isRequired,
	openLoading: PropTypes.func.isRequired,
	selectedKeywords: PropTypes.string,
	selectedLocations: PropTypes.string,
	setArticles: PropTypes.func.isRequired,
	setKeywords: PropTypes.func.isRequired,
	setLocations: PropTypes.func.isRequired,
	setSelectedKeywords: PropTypes.func.isRequired,
	setSelectedLocations: PropTypes.func.isRequired,
};

OnlineScreen.defaultProps = {
	selectedKeywords: null,
	selectedLocations: null,
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
	closeLoading: closeLoadingAction,
	getArticles: getArticlesAction,
	openLoading: openLoadingAction,
};

export default utils.compose(connect(mapStateToProps, mapDispatchToProps))(
	OnlineScreen,
);
