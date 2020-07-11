import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '~/constants/actions';

export function login() {
	return (dispatch) => dispatch({ type: LOGIN_SUCCESS });
}

export function logout() {
	return (dispatch) => dispatch({ type: LOGOUT_SUCCESS });
}
