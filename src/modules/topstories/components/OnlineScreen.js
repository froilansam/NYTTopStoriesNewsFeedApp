/* eslint-disable react/forbid-prop-types */

import React, { useEffect, useState } from 'react';
import {
	ScrollView,
	Animated,
	FlatList,
	View,
	Text,
	RefreshControl,
	Image,
} from 'react-native';
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
	deleteArticle as deleteArticleAction,
	saveArticle as saveArticleAction,
	selectSection as selectSectionAction,
} from '../topstories.action';

import FirstArticle from './FirstArticle';
import {
	defaultErrorHandler,
	show,
} from '~/modules/notification/notification.library';
import SectionButton from './SectionButton';
import SucceedingArticle from './SucceedingArticle';
import {
	handleSaveUnsaveArticle,
	addIdToArticles,
	getGeoInfos,
	getDesInfo,
} from '../topstories.library';

import style from './OnlineScreen.style';

const OnlineScreen = ({
	auth,
	closeLoading,
	deleteArticle,
	getArticles,
	isConnected,
	navigation,
	openLoading,
	saveArticle,
	selectSection,
}) => {
	const [articles, setArticles] = useState([]);
	const [selectedKeywords, setSelectedKeywords] = useState(null);
	const [keywords, setKeywords] = useState([]);
	const [selectedLocations, setSelectedLocations] = useState(null);
	const [locations, setLocations] = useState([]);
	const offlineArticles = _.get(auth, 'offlineArticles', []);
	const scrollYAnimatedValue = new Animated.Value(0);
	let renderArticles = [...articles];

	const diffClamp = Animated.diffClamp(
		scrollYAnimatedValue,
		0,
		isConnected ? 160 : 80,
	);

	const headerAnimation = diffClamp.interpolate({
		inputRange: [0, isConnected ? 160 : 80],
		outputRange: [0, isConnected ? -160 : -80],
	});

	const cacheImages = (articlesInfo) => {
		return articlesInfo.reduce((acc, articleInfo) => {
			if (_.get(articleInfo, 'multimedia[0].url'))
				return acc.concat(
					Image.prefetch(_.get(articleInfo, 'multimedia[0].url')),
				);
			return acc;
		}, []);
	};

	const retrieveArticles = (type = null) => {
		const selectedSection = _.get(auth, 'selectedSection', null);
		getArticles(selectedSection)
			.then(async (data) => {
				const articlesInfo = addIdToArticles(data);
				const images = cacheImages(articlesInfo);

				const locationsChoices = getGeoInfos(articlesInfo);
				const keywordsChoices = getDesInfo(articlesInfo);

				setLocations(locationsChoices);
				setKeywords(keywordsChoices);
				setArticles(articlesInfo);

				await Promise.all([...images]);
				closeLoading();
				if (type === 'refresh') show('Section has been refreshed.');
			})
			.catch((err) => {
				closeLoading();
				defaultErrorHandler(null, err);
			});
	};

	const handleSaveUnsaveArticleHandler = (article) => {
		const isDownloaded = offlineArticles.find((articleInfo) => {
			return articleInfo.url === article.url;
		});

		handleSaveUnsaveArticle(
			article,
			deleteArticle,
			isDownloaded,
			offlineArticles,
			saveArticle,
		);
	};

	const handleSection = (section) => {
		openLoading();
		selectSection(section);
		setSelectedKeywords(null);
		setSelectedLocations(null);
	};

	const refresh = () => {
		openLoading();
		retrieveArticles('refresh');
	};

	useEffect(() => {
		openLoading();
	}, []);

	useEffect(() => {
		retrieveArticles();
	}, [auth.selectedSection]);

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
				refreshControl={
					// eslint-disable-next-line react/jsx-wrap-multilines
					<RefreshControl
						onRefresh={refresh}
						progressViewOffset={160}
						refreshing={false}
					/>
				}
				scrollEventThrottle={16}
			>
				{renderArticles.length > 0 &&
					renderArticles.map((article, index) => {
						if (index === 0)
							return (
								<FirstArticle
									article={article}
									handleSaveUnsaveArticle={() => {
										handleSaveUnsaveArticleHandler(article);
									}}
									navigation={navigation}
								/>
							);

						return null;
					})}
				<FlatList
					data={renderArticles}
					keyExtractor={(item) => item.id}
					renderItem={({ index, item: article }) => (
						<SucceedingArticle
							handleSaveUnsaveArticle={() => {
								handleSaveUnsaveArticleHandler(article);
							}}
							index={index}
							item={article}
							navigation={navigation}
						/>
					)}
				/>
			</ScrollView>
			<Animated.View
				style={[
					{
						transform: [{ translateY: headerAnimation }],
					},
					style.onlineHeader,
				]}
			>
				<Text style={style.onlineHeaderTitle}>The New York Times</Text>

				<View style={style.onlineLineStyle} />
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
			<View style={style.onlineFilterView}>
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
								if (selectedLocations)
									return show(
										`Showing article/s about ${selectedLocations} or ${selected.desInfo}.`,
									);
								return show(
									`Showing article/s about ${selected.desInfo}.`,
								);
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

								if (selectedKeywords)
									return show(
										`Showing article/s about ${selected.geoInfo} or ${selectedKeywords}.`,
									);
								return show(
									`Showing article/s about ${selected.geoInfo}.`,
								);
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
	auth: PropTypes.shape().isRequired,
	closeLoading: PropTypes.func.isRequired,
	deleteArticle: PropTypes.func.isRequired,
	getArticles: PropTypes.func.isRequired,
	isConnected: PropTypes.bool.isRequired,
	navigation: PropTypes.shape({}).isRequired,
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
	saveArticle: saveArticleAction,
	selectSection: selectSectionAction,
};

export default utils.compose(connect(mapStateToProps, mapDispatchToProps))(
	OnlineScreen,
);
