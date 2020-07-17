import _ from 'lodash';

import { show } from '../notification/notification.library';

/* eslint-disable import/prefer-default-export */
export const handleSaveUnsaveArticle = (
	article,
	deleteArticle,
	isDownloaded,
	offlineArticles,
	saveArticle,
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

export const isArticleDownloaded = (offlineArticles, article) =>
	offlineArticles.find((articleInfo) => {
		return articleInfo.url === article.url;
	});

export const addIdToArticles = (data) =>
	data.data.results.map((art, index) => {
		return {
			...art,
			id: index,
		};
	});

export const getGeoInfos = (articlesInfo) =>
	articlesInfo.reduce((acc, art) => {
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

export const getDesInfo = (articlesInfo) =>
	articlesInfo.reduce((acc, art) => {
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
