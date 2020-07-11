/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';

import LogoutItem from './LogoutItem';

function Sidebar(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<LogoutItem />
		</DrawerContentScrollView>
	);
}

export default Sidebar;
