/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	Animated,
	TouchableOpacity,
	Image,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { FlatList } from 'react-native-gesture-handler';

import _ from 'lodash';
import moment from 'moment';
import { Icon, Button, ActionSheet } from 'native-base';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import sections from '~/constants/sections';
import layout from '~/constants/layout';
import {
	defaultErrorHandler,
	show,
} from '~/modules/notification/notification.library';
import utils from '~/utils';

import {
	getArticles as getArticlesAction,
	closeLoading as closeLoadingAction,
	openLoading as openLoadingAction,
	selectSection as selectSectionAction,
	saveArticle as saveArticleAction,
	deleteArticle as deleteArticleAction,
} from '../topstories.action';

const loading = require('~/assets/images/loading.png');

const TopStoriesScreen = ({
	auth,
	closeLoading,
	deleteArticle,
	getArticles,
	navigation,
	openLoading,
	saveArticle,
	selectSection,
}) => {
	const [articles, setArticles] = useState([]);
	const [isConnected, setIsConnected] = useState(false);
	const [selectedKeywords, setSelectedKeywords] = useState(null);
	const [keywords, setKeywords] = useState([]);
	const [selectedLocations, setSelectedLocations] = useState(null);
	const [locations, setLocations] = useState([]);

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

	useEffect(() => {
		openLoading();
	}, []);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);

			if (!state.isConnected)
				return show('You are offline. Please connect to the internet.');
			return show('You are online.');
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
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
			})
			.catch((err) => {
				closeLoading();
				defaultErrorHandler(null, err);
			});
	}, [auth.selectedSection]);

	const handleSection = (section) => {
		openLoading();
		selectSection(section);
		setSelectedKeywords(null);
		setSelectedLocations(null);
	};

	const handleSaveUnsaveArticle = (
		article,
		isDownloaded,
		offlineArticles,
	) => {
		if (isDownloaded) {
			const articleIndex = offlineArticles.findIndex((articleInfo) => {
				return articleInfo.url === article.url;
			});

			if (articleIndex >= 0) {
				deleteArticle([
					...offlineArticles.slice(0, articleIndex),
					...offlineArticles.slice(articleIndex + 1),
				]);

				return show('Article has been unsaved.');
			}
		}

		const offlineArticlesLength = offlineArticles.length;

		const offlineID =
			offlineArticlesLength <= 0
				? 1
				: offlineArticles[offlineArticlesLength - 1].offlineID + 1;

		saveArticle({
			...article,
			offlineID,
		});

		return show('Article has been saved offline.');
	};

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

	const renderFirstArticle = (article) => {
		const offlineArticles = _.get(auth, 'offlineArticles', []);
		const isDownloaded = offlineArticles.find((articleInfo) => {
			return articleInfo.url === article.url;
		});

		return (
			<TouchableOpacity
				onPress={() => {
					return navigation.navigate('ARTICLE_SCREEN', {
						article_url: _.get(article, 'url', null),
					});
				}}
			>
				<View style={{ backgroundColor: '#fff', elevation: 4 }}>
					<View>
						<Image
							source={{
								uri: _.get(article, 'multimedia[0].url', null),
							}}
							style={{
								width: layout.window.width,
								height: 200,
							}}
						/>
					</View>
					{!!_.get(article, 'byline', null) && (
						<>
							<View>
								<Text
									style={{
										fontFamily: 'Roboto',
										fontSize: 15,
										marginHorizontal: 10,
										marginTop: 10,
									}}
								>
									{_.get(article, 'byline', null)
										.split('By ')[1]
										.toUpperCase()}
								</Text>
							</View>
						</>
					)}
					<View>
						<Text
							style={{
								fontFamily: 'Cheltenham',
								fontSize: 30,
								marginHorizontal: 10,
								marginBottom: 10,
							}}
						>
							{_.get(article, 'title', null)}
						</Text>
					</View>

					<View>
						<Text
							style={{
								fontFamily: 'Imperial',
								fontSize: 15,
								color: '#666666',
								margin: 10,
							}}
						>
							{_.get(article, 'abstract', null)}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<Text
							style={{
								fontFamily: 'Imperial',
								fontSize: 15,
								color: '#666666',
								marginHorizontal: 10,
								marginBottom: 10,
								alignSelf: 'flex-start',
							}}
						>
							{moment(
								_.get(article, 'published_date', null),
							).fromNow()}
						</Text>
						<View
							style={{
								justifyContent: 'flex-end',
								flexDirection: 'row',
								marginBottom: 10,
							}}
						>
							<TouchableOpacity
								onPress={() => {
									handleSaveUnsaveArticle(
										article,
										isDownloaded,
										offlineArticles,
									);
								}}
							>
								<View>
									<Icon
										name={
											isDownloaded
												? 'checkmark'
												: 'download'
										}
										style={{ marginHorizontal: 20 }}
										type="Ionicons"
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const rendeSucceedingArticle = ({ index, item: article }) => {
		if (index !== 0) {
			const offlineArticles = _.get(auth, 'offlineArticles', []);
			const isDownloaded = offlineArticles.find((articleInfo) => {
				return articleInfo.url === article.url;
			});

			return (
				<TouchableOpacity
					onPress={() => {
						return navigation.navigate('ARTICLE_SCREEN', {
							article_url: _.get(article, 'url', null),
						});
					}}
				>
					<View
						style={{
							backgroundColor: '#fff',
							elevation: 4,
							marginTop: 10,
							paddingTop: 10,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
							}}
						>
							<View
								style={{
									flexDirection: 'column',
									width: '70%',
								}}
							>
								{!!_.get(article, 'byline', null) && (
									<View>
										<Text
											style={{
												fontFamily: 'Roboto',
												fontSize: 13,
												marginHorizontal: 10,
												marginTop: 10,
											}}
										>
											{_.get(article, 'byline', null)
												.split('By ')[1]
												.toUpperCase()}
										</Text>
									</View>
								)}
								<View>
									<Text
										style={{
											fontFamily: 'Cheltenham',
											fontSize: 25,
											marginHorizontal: 10,
											marginBottom: 5,
										}}
									>
										{_.get(article, 'title', null)}
									</Text>
								</View>
								<View>
									<Text
										style={{
											fontFamily: 'Imperial',
											fontSize: 15,
											color: '#666666',
											marginHorizontal: 10,
											marginTop: 5,
										}}
									>
										{_.get(article, 'abstract', null)}
									</Text>
								</View>
							</View>
							<View
								style={{
									flexDirection: 'column',
									width: '30%',
									padding: 10,
								}}
							>
								<Image
									source={{
										uri: _.get(
											article,
											'multimedia[0].url',
											null,
										),
									}}
									style={{
										width: 80,
										height: 80,
									}}
								/>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 10,
							}}
						>
							<Text
								style={{
									fontFamily: 'Imperial',
									fontSize: 15,
									color: '#666666',
									marginHorizontal: 10,
									marginBottom: 10,
									alignSelf: 'flex-start',
								}}
							>
								{moment(
									_.get(article, 'published_date', null),
								).fromNow()}
							</Text>
							<View
								style={{
									justifyContent: 'flex-end',
									flexDirection: 'row',
									marginBottom: 10,
								}}
							>
								<TouchableOpacity
									onPress={() => {
										handleSaveUnsaveArticle(
											article,
											isDownloaded,
											offlineArticles,
										);
									}}
								>
									<View>
										<Icon
											name={
												isDownloaded
													? 'checkmark'
													: 'download'
											}
											style={{ marginHorizontal: 20 }}
											type="Ionicons"
										/>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			);
		}
	};

	const sectionButton = (top, bottom) => (
		<View>
			<TouchableOpacity
				onPress={() => handleSection(_.get(top, 'value', null))}
			>
				<View
					style={{
						borderColor: 'black',
						borderWidth: 1,
						paddingVertical: 5,
						width: 130,
						borderRadius: 10,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 10,
						marginHorizontal: 2,
						backgroundColor:
							_.get(auth, 'selectedSection', null) === top.value
								? 'black'
								: '#fff',
					}}
				>
					<Text
						style={{
							fontFamily: 'Imperial',
							fontSize: 17,
							color:
								_.get(auth, 'selectedSection', null) ===
								top.value
									? '#fff'
									: 'black',
						}}
					>
						{_.get(top, 'label', null)}
					</Text>
				</View>
			</TouchableOpacity>
			{!!_.get(bottom, 'value', null) && (
				<TouchableOpacity
					onPress={() => handleSection(_.get(bottom, 'value', null))}
				>
					<View
						style={{
							borderColor: 'black',
							borderWidth: 1,
							paddingVertical: 5,
							width: 130,
							borderRadius: 10,
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 10,
							marginHorizontal: 2,
							backgroundColor:
								_.get(auth, 'selectedSection', null) ===
								_.get(bottom, 'value', null)
									? 'black'
									: '#fff',
						}}
					>
						<Text
							style={{
								fontFamily: 'Imperial',
								fontSize: 17,
								color:
									_.get(auth, 'selectedSection', null) ===
									_.get(bottom, 'value', null)
										? '#fff'
										: 'black',
							}}
						>
							{_.get(bottom, 'label', null)}
						</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);

	const renderOffline = () => {
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
						_.get(auth, 'offlineArticles', []).map(
							(article, index) => {
								if (index === 0)
									return renderFirstArticle(article);
							},
						)}

					<FlatList
						data={_.get(auth, 'offlineArticles', [])}
						keyExtractor={(item) => item.id}
						renderItem={rendeSucceedingArticle}
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

	const renderOnline = () => {
		let renderArticles = [...articles];

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
							if (index === 0) return renderFirstArticle(article);
						})}
					<FlatList
						data={renderArticles}
						keyExtractor={(item) => item.id}
						renderItem={rendeSucceedingArticle}
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
								return sectionButton(
									section,
									sections[index + 1],
								);
							}
						})}
					</ScrollView>
				</Animated.View>
			</>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			{!isConnected ? renderOffline() : renderOnline()}
			{isConnected && (
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
										(keyword) =>
											keyword.id === buttonIndex + 1,
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
			)}
		</View>
	);
};

TopStoriesScreen.propTypes = {
	auth: PropTypes.shape().isRequired,
	closeLoading: PropTypes.func.isRequired,
	deleteArticle: PropTypes.func.isRequired,
	getArticles: PropTypes.func.isRequired,
	navigation: PropTypes.shape().isRequired,
	openLoading: PropTypes.func.isRequired,
	saveArticle: PropTypes.func.isRequired,
	selectSection: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
	closeLoading: closeLoadingAction,
	deleteArticle: deleteArticleAction,
	getArticles: getArticlesAction,
	openLoading: openLoadingAction,
	selectSection: selectSectionAction,
	saveArticle: saveArticleAction,
};
export default utils.compose(connect(mapStateToProps, mapDispatchToProps))(
	TopStoriesScreen,
);
