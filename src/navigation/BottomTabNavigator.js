/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import PropTypes from 'prop-types';

import TabBarIcon from '~/components/TabBarIcon';
import HomeScreen from '~/screens/HomeScreen';
import LinksScreen from '~/screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function getHeaderTitle(route) {
	const routeName =
		route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case 'Home':
			return 'How to get started';
		case 'Links':
			return 'Links to learn more';
		default:
			return '';
	}
}

export default function BottomTabNavigator({ navigation, route }) {
	// Set the header title on the parent stack navigator depending on the
	// currently active tab. Learn more in the documentation:
	// https://reactnavigation.org/docs/en/screen-options-resolution.html
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				component={HomeScreen}
				name="Home"
				options={{
					title: 'Get Started',
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="md-code-working" />
					),
				}}
			/>
			<BottomTab.Screen
				component={LinksScreen}
				name="Links"
				options={{
					title: 'Resources',
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="md-book" />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

BottomTabNavigator.propTypes = {
	navigation: PropTypes.shape({
		setOptions: PropTypes.func,
	}).isRequired,
	route: PropTypes.shape({
		state: PropTypes.object,
	}).isRequired,
};
