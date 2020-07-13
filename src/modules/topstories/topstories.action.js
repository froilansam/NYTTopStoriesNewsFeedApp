/* eslint-disable import/prefer-default-export */
import api from '~/utils/api';
import { ENDPOINTS } from '~/constants/api';
import {
	CLOSE_LOADING,
	OPEN_LOADING,
	SELECT_SECTION,
	SAVE_ARTICLE,
	DELETE_ARTICLE,
} from '~/constants/actions';

export function getArticles(section) {
	const url = `${section}${ENDPOINTS.APP_KEY}`;
	return () => api.get(url).then((data) => data);
}

export function closeLoading() {
	return (dispatch) => {
		dispatch({
			type: CLOSE_LOADING,
		});
	};
}

export function openLoading() {
	return (dispatch) => {
		dispatch({
			type: OPEN_LOADING,
		});
	};
}

export function selectSection(section) {
	return (dispatch) => {
		dispatch({
			type: SELECT_SECTION,
			data: section,
		});
	};
}

export function saveArticle(article) {
	return (dispatch) => {
		dispatch({
			type: SAVE_ARTICLE,
			data: article,
		});
	};
}

export function deleteArticle(articles) {
	return (dispatch) => {
		dispatch({
			type: DELETE_ARTICLE,
			data: articles,
		});
	};
}
