import {
	CLOSE_LOADING,
	OPEN_LOADING,
	SELECT_SECTION,
	SAVE_ARTICLE,
	DELETE_ARTICLE,
} from '~/constants/actions';
import initialState from '~/store/initialState';

export default (state = initialState.auth, action = null) => {
	switch (action.type) {
		case OPEN_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case CLOSE_LOADING:
			return {
				...state,
				isLoading: false,
			};

		case SELECT_SECTION:
			return {
				...state,
				selectedSection: action.data,
			};

		case SAVE_ARTICLE:
			return {
				...state,
				offlineArticles: [...state.offlineArticles, action.data],
			};

		case DELETE_ARTICLE:
			return {
				...state,
				offlineArticles: action.data,
			};

		default:
			return state;
	}
};
