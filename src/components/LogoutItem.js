import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { logout as logoutAction } from '~/modules/auth/auth.actions';
import utils from '~/utils';

function LogoutItem(props) {
	const { logout } = props;

	return <DrawerItem label="Logout" onPress={logout} />;
}

LogoutItem.propTypes = {
	logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
	logout: logoutAction,
};

export default utils.compose(connect(null, mapDispatchToProps))(LogoutItem);
