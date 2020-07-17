/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import _ from 'lodash';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
	defaultErrorHandler,
	show,
} from '~/modules/notification/notification.library';
import utils from '~/utils';

import OfflineScreen from '../components/OfflineScreen';
import OnlineScreen from '../components/OnlineScreen';
import {
	getArticles as getArticlesAction,
	closeLoading as closeLoadingAction,
	openLoading as openLoadingAction,
	selectSection as selectSectionAction,
	saveArticle as saveArticleAction,
	deleteArticle as deleteArticleAction,
} from '../topstories.action';

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

	return (
		<View style={{ flex: 1 }}>
			{!isConnected ? (
				<OfflineScreen
					handleSaveUnsaveArticle={handleSaveUnsaveArticle}
					isConnected={isConnected}
					navigation={navigation}
				/>
			) : (
				<OnlineScreen
					articles={articles}
					handleSaveUnsaveArticle={handleSaveUnsaveArticle}
					handleSection={handleSection}
					isConnected={isConnected}
					keywords={keywords}
					locations={locations}
					navigation={navigation}
					selectedKeywords={selectedKeywords}
					selectedLocations={selectedLocations}
					setArticles={setArticles}
					setKeywords={setKeywords}
					setLocations={setLocations}
					setSelectedKeywords={setSelectedKeywords}
					setSelectedLocations={setSelectedLocations}
				/>
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
