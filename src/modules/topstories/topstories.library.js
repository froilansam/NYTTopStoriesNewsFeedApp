import _ from 'lodash';

import { show } from '../notification/notification.library';

/**
 * A function that checks if the article has been already downloaded offline.
 * @param {Object[]} offlineArticles - Array of Articles that are saved offline.
 * @param {Object} article - Object of Article from NY Times API
 */
export const isArticleDownloaded = (offlineArticles, article) =>
	offlineArticles.find((articleInfo) => {
		return articleInfo.url === article.url;
	});

/**
 * This is a function for saving and unsaving articles offline.
 * @param {Object} article - Object of article that is going to be saved.
 * @param {function} deleteArticle - Function that deletes article from offline articles.
 * @param {Object[]} offlineArticles - Array of articles that are saved offline.
 * @param {function} saveArticle - Function that saves article to offline articles.
 */
export const handleSaveUnsaveArticle = (
	article,
	deleteArticle,
	offlineArticles,
	saveArticle,
) => {
	// These codes check if the article has been already downloaded but returns index.
	const isDownloaded = isArticleDownloaded(offlineArticles, article);

	if (isDownloaded) {
		const articleIndex = offlineArticles.findIndex((articleInfo) => {
			return articleInfo.url === article.url;
		});

		if (articleIndex >= 0) {
			// This action deletes article from the state manager.
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

	// This action saves article to the state manager.
	saveArticle({
		...article,
		offlineID,
	});

	return show('Article has been saved offline.');
};

/**
 * Since NY Times API doesn't return ID on each article, this function attaches ID on each article.
 * @param {Object[]} data - Array of Articles
 */
export const addIdToArticles = (data) =>
	data.data.results.map((art, index) => {
		return {
			...art,
			id: index,
		};
	});

/**
 * this function gets the Location and Keywords from each article so that it will be put on filter.
 * @param {Object[]} articlesInfo - Array of Articles
 * @param {string} type - Type of Information you would like to get [KEYWORDS, LOCATIONS]
 */
export const getInfo = (articlesInfo, type) =>
	articlesInfo.reduce((acc, art) => {
		const informations =
			type === 'KEYWORDS'
				? _.get(art, 'des_facet', [])
				: _.get(art, 'geo_facet', []);

		const info = informations.sort((a, b) => {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		});

		const accumulator = [...acc];
		if (info.length > 0) {
			const infoMapped = info.reduce(
				(accu, information) => {
					const included = accu.find(
						(single) => single.information === information,
					);

					if (!included) {
						return accu.concat({
							id: accu.length + 1,
							information,
						});
					}
					return accu;
				},
				[...accumulator],
			);

			return infoMapped;
		}
		return accumulator;
	}, []);
