import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import PropTypes from 'prop-types';

import Colors from '~/constants/color';

export default function TabBarIcon(props) {
	const { focused, name } = props;

	return (
		<Ionicons
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			name={name}
			size={30}
			style={{ marginBottom: -3 }}
		/>
	);
}

TabBarIcon.propTypes = {
	focused: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
};
