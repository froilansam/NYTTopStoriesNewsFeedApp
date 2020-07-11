import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import SampleModal from '~/modules/auth/modals/SampleModal';
import utils from '~/utils';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const Root = createStackNavigator();

function RootNavigator({ auth }) {
	return (
		<Root.Navigator mode="modal">
			{auth.isLoggedIn ? (
				<Root.Screen
					component={DrawerNavigator}
					name="Main"
					options={{ headerShown: false }}
				/>
			) : (
				<Root.Screen
					component={AuthNavigator}
					name="Auth"
					options={{ headerShown: false }}
				/>
			)}
			<Root.Screen
				component={SampleModal}
				name="SAMPLE"
				options={{ headerTitle: 'Sample' }}
			/>
		</Root.Navigator>
	);
}

RootNavigator.propTypes = {
	auth: PropTypes.shape({
		isLoggedIn: PropTypes.bool,
	}).isRequired,
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default utils.compose(connect(mapStateToProps))(RootNavigator);
