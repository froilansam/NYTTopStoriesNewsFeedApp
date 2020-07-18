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
	getInfo,
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

	// These funtions are for the component's header animation
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

	// This function caches every first image on article array of images
	const cacheImages = (articlesInfo) => {
		return articlesInfo.reduce((acc, articleInfo) => {
			const imageURL = _.get(articleInfo, 'multimedia[0].url');

			if (imageURL) return acc.concat(Image.prefetch(imageURL));
			return acc;
		}, []);
	};

	/**
	 * This function handles Filter button when pressed.
	 * @param {Object[]} data - Array of Keywords of Locations
	 * @param {string} filterType - String of filter type [Keywords or Locations]
	 */
	const handleFilterButton = (data, filterType) => {
		// It uses actionsheet for choosing a filter.
		return ActionSheet.show(
			{
				options: data
					.map((datum) => datum.information)
					.concat('Cancel'),
				cancelButtonIndex: data.length,
				title: filterType,
			},
			(buttonIndex) => {
				if (buttonIndex === data.length) {
					return filterType === 'Keywords'
						? setSelectedKeywords(null)
						: setSelectedLocations(null);
				}

				const selected = data.find(
					(datum) => datum.id === buttonIndex + 1,
				);

				if (filterType === 'Keywords') {
					setSelectedKeywords(selected.information);
					if (selectedLocations)
						return show(
							`Showing article/s about ${selected.information} or ${selectedKeywords}.`,
						);
					return show(
						`Showing article/s about ${selected.information}.`,
					);
				}

				setSelectedLocations(selected.information);

				if (selectedKeywords)
					return show(
						`Showing article/s about ${selectedLocations} or ${selected.information}.`,
					);
				return show(`Showing article/s about ${selected.information}.`);
			},
		);
	};

	// This function retrieves articles from NYTimes API and save to local state manager
	const retrieveArticles = (type = null) => {
		const selectedSection = _.get(auth, 'selectedSection', null);

		// This action retrieves articles from NYTimes API
		getArticles(selectedSection)
			.then(async (data) => {
				// Adds ID to every article
				const articlesInfo = addIdToArticles(data);
				// Gets article locations and keywords
				const locationsChoices = getInfo(articlesInfo, 'LOCATIONS');
				const keywordsChoices = getInfo(articlesInfo, 'KEYWORDS');

				setLocations(locationsChoices);
				setKeywords(keywordsChoices);
				setArticles(articlesInfo);

				// Caches images from every article

				const images = cacheImages(articlesInfo);
				await Promise.all([...images]);
				closeLoading();
				if (type === 'refresh') show('Section has been refreshed.');
			})
			.catch((err) => {
				closeLoading();
				defaultErrorHandler(null, err);
			});
	};

	// This function handles press event on section buttons
	const handleSection = (section) => {
		openLoading();
		selectSection(section);
		setSelectedKeywords(null);
		setSelectedLocations(null);
	};

	const renderFilterComponent = () => (
		<View style={style.onlineFilterView}>
			<Button
				onPress={() => {
					return handleFilterButton(keywords, 'Keywords');
				}}
				style={style.onlineFilterButton}
			>
				<Text style={style.onlineFilterButtonText}>
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
					return handleFilterButton(locations, 'Locations');
				}}
				style={style.onlineFilterButton}
			>
				<Text style={style.onlineFilterButtonText}>
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
	);

	// Refresh even on Refresh Control
	const refresh = () => {
		openLoading();
		retrieveArticles('refresh');
	};

	// This function opens state loading.
	useEffect(() => {
		openLoading();
	}, []);

	// This function retrieves articles when section is changed.
	useEffect(() => {
		retrieveArticles();
	}, [auth.selectedSection]);

	// This function filters article by what users choose on filter component
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
				// RefreshControl: Pulldown to refresh
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
				{/* The First Article Component */}
				{renderArticles.length > 0 &&
					renderArticles.map((article, index) => {
						if (index === 0)
							return (
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

				{/* This maps succeeding articles */}
				<FlatList
					data={renderArticles}
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

			{/* This is the animated header */}
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

				{/* This is the buttons section */}
				<ScrollView horizontal>
					{/* Mapping sections to render Section Button COmponent for each */}
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

			{/* Filter Component */}
			{renderFilterComponent()}
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
