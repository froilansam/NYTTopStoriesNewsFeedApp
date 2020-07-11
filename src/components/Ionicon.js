/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Platform } from 'react-native';

import { Icon } from 'native-base';
import PropTypes from 'prop-types';

export default function Ionicon({ name, ...props }) {
	return (
		<Icon
			{...props}
			name={Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`}
			type="Ionicons"
		/>
	);
}

Ionicon.propTypes = {
	name: PropTypes.string.isRequired,
	onPress: PropTypes.func,
};

Ionicon.defaultProps = {
	onPress: () => {},
};
