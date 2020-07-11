import { Alert } from 'react-native';

import HTTPStatus from 'http-status';
import _ from 'lodash';
import { Toast } from 'native-base';
import Reactotron from 'reactotron-react-native';

const ERROR = 'error';
const INFO = 'info';
const SUCCESS = 'success';
const WARNING = 'warning';

export function show(message, type, options = {}) {
	switch (type) {
		case ERROR:
			Reactotron.error(message);

			break;
		case WARNING:
			Reactotron.warn(message);

			break;
		case SUCCESS:
		default:
			Reactotron.log(message);

			break;
	}

	Toast.show({
		...options,
		text: message,
		duration: 5000,
	});
}

export function showSuccess(message, title, options) {
	show(message, SUCCESS, options);
}

function parseErrors(errors) {
	const parsedErrors = [];
	const keys = Object.keys(errors);

	keys.forEach((key) => {
		parsedErrors.push(`${key}: ${errors[key].join(' ')}`);
	});

	return parsedErrors.join('\n');
}

export function parseError(error) {
	if (error) {
		if (error.errors && _.isObject(error.errors))
			return parseErrors(error.errors);
		if (error.response) return parseError(error.response);
		if (error.data) return parseError(error.data);
		if (error.error) return parseError(error.error);
		if (error.err) return parseError(error.err);
		if (error.message) return parseError(error.message);
		if (typeof error === 'string') return error;
	}

	return 'An unknown error has occured. Please contact our tech support team.';
}

export function showError(message, title, options) {
	show(parseError(message), ERROR, options);
}

export function showWarning(message, title, options) {
	show(message, WARNING, options);
}

export function showInfo(message, title, options) {
	show(message, INFO, options);
}

export function showAlert(message, title) {
	Alert.alert(title, message);
}

export function showConfirmation(
	message,
	title,
	confirmCallback,
	cancelCallback,
	confirmText,
	cancelText,
) {
	Alert.alert(title || 'Confirm Action', message, [
		{
			text: cancelText || 'Cancel',
			onPress: cancelCallback || (() => {}),
		},
		{
			text: confirmText || 'OK',
			onPress: confirmCallback || (() => {}),
		},
	]);
}

export function defaultErrorHandler(logout, err) {
	if (err.message === 'Network Error') {
		return showAlert(
			'You are not connected to the internet. Please try again later.',
		);
	}

	if (_.get(err, 'response.status') === HTTPStatus.UNAUTHORIZED) {
		showError('Session expired. Please login again.');

		if (logout) {
			logout();
		}
	} else if (_.get(err, 'response.status') === HTTPStatus.NOT_FOUND) {
		showError('Record does not exist');
	} else {
		showError(err);
	}

	return err;
}
