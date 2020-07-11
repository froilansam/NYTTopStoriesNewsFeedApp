import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '~/modules/auth/screens/LoginScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen component={LoginScreen} name="Login" />
		</Stack.Navigator>
	);
}

AuthNavigator.propTypes = {};
