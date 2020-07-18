/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { show } from '~/modules/notification/notification.library';
import utils from '~/utils';

import OfflineScreen from '../components/OfflineScreen';
import OnlineScreen from '../components/OnlineScreen';
import {
	getArticles as getArticlesAction,
	closeLoading as closeLoadingAction,
	openLoading as openLoadingAction,
	selectSection as selectSectionAction,
} from '../topstories.action';

const TopStoriesScreen = ({ navigation, openLoading }) => {
	const [isConnected, setIsConnected] = useState(false);

	/** Open state loading if component did mount */
	useEffect(() => {
		openLoading();
	}, []);

	/**
	 *  A listener if the network goes offline. If the network goes offline,
	 *  the application will only display offline articles.
	 */
	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);

			/** A toaster that will pop up if the network state changes, this is for UI/UX
			 * 	for the user to know if their network state changes
			 */
			if (!state.isConnected)
				return show('You are offline. Please connect to the internet.');
			return show('You are online.');
		});

		return unsubscribe;
	}, []);

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			{!isConnected ? (
				/**
				 * The Offline Screen Component
				 */
				<OfflineScreen
					isConnected={isConnected}
					navigation={navigation}
				/>
			) : (
				/**
				 * The Online Screen Component
				 */
				<OnlineScreen
					isConnected={isConnected}
					navigation={navigation}
				/>
			)}
		</View>
	);
};

TopStoriesScreen.propTypes = {
	navigation: PropTypes.shape().isRequired,
	openLoading: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

const mapDispatchToProps = {
	closeLoading: closeLoadingAction,
	getArticles: getArticlesAction,
	openLoading: openLoadingAction,
	selectSection: selectSectionAction,
};

export default utils.compose(connect(mapStateToProps, mapDispatchToProps))(
	TopStoriesScreen,
);
