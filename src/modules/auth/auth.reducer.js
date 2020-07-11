import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '~/constants/actions';
import initialState from '~/store/initialState';

export default (state = initialState.auth, action = null) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...action.data,
				isLoggedIn: true,
			};

		case LOGOUT_SUCCESS:
			return {
				isLoggedIn: false,
			};

		default:
			return state;
	}
};
