import * as React from 'react';
import { Text } from 'react-native';

import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export function MonoText(props) {
	const { children, style } = props;

	return (
		<Text style={[style, { fontFamily: 'space-mono' }]}>{children}</Text>
	);
}

MonoText.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.shape({
		codeHighlightText: PropTypes.object,
	}),
};

MonoText.defaultProps = {
	style: {},
};
