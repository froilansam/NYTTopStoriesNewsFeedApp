import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PropTypes from 'prop-types';

import Ionicon from '../components/Ionicon';

import BottomTabNavigator from './BottomTabNavigator';

import styles from './StackNavigator.style';

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerLeft: () => (
					<Ionicon
						name="menu"
						onPress={navigation.openDrawer}
						style={styles.headerLeftIcon}
					/>
				),
			}}
		>
			<Stack.Screen component={BottomTabNavigator} name="Root" />
		</Stack.Navigator>
	);
}

StackNavigator.propTypes = {
	navigation: PropTypes.shape({
		openDrawer: PropTypes.func,
	}).isRequired,
};
