import * as React from 'react';
import { connect } from 'react-redux';

import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';

import { login as loginAction } from '~/modules/auth/auth.actions';
import utils from '~/utils';

import LoginForm from '../components/LoginForm';

import styles from './LoginScreen.style';

function LoginScreen(props) {
	const { login } = props;

	return (
		<Container>
			<Content contentContainerStyle={styles.content} padder>
				<LoginForm onSubmit={login} />
			</Content>
		</Container>
	);
}

LoginScreen.navigationOptions = {
	header: null,
};

LoginScreen.propTypes = {
	login: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
	login: loginAction,
};

export default utils.compose(connect(null, mapDispatchToProps))(LoginScreen);
