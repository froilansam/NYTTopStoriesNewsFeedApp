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

// An action that gets article from the NYTimes API
export function getArticles(section) {
	const url = `${section}${ENDPOINTS.APP_KEY}`;
	return () => api.get(url).then((data) => data);
}

// An action that closes state loading
export function closeLoading() {
	return (dispatch) => {
		dispatch({
			type: CLOSE_LOADING,
		});
	};
}

// An action that opens state loading
export function openLoading() {
	return (dispatch) => {
		dispatch({
			type: OPEN_LOADING,
		});
	};
}

// An action that saves selected section by user to the state manager
export function selectSection(section) {
	return (dispatch) => {
		dispatch({
			type: SELECT_SECTION,
			data: section,
		});
	};
}

// An action thats saves article to the state manager.
export function saveArticle(article) {
	return (dispatch) => {
		dispatch({
			type: SAVE_ARTICLE,
			data: article,
		});
	};
}

// An action that deletes article from the state manager.
export function deleteArticle(articles) {
	return (dispatch) => {
		dispatch({
			type: DELETE_ARTICLE,
			data: articles,
		});
	};
}
