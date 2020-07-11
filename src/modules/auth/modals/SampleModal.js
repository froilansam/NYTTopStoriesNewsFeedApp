import * as React from 'react';

import { Container, Content, Text } from 'native-base';

function LoginScreen() {
	return (
		<Container>
			<Content padder>
				<Text>This is a sample modal</Text>
			</Content>
		</Container>
	);
}

LoginScreen.navigationOptions = {
	header: null,
};

export default LoginScreen;
