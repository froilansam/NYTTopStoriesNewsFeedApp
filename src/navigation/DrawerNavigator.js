import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Sidebar from '../components/Sidebar';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator drawerContent={Sidebar}>
			<Drawer.Screen component={StackNavigator} name="Main" />
		</Drawer.Navigator>
	);
}
