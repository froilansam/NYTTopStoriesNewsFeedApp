import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
	contentContainer: {
		paddingTop: 15,
	},
	optionIconContainer: {
		marginRight: 12,
	},
	option: {
		backgroundColor: '#fdfdfd',
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: 0,
		borderColor: '#ededed',
	},
	lastOption: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	optionText: {
		fontSize: 15,
		alignSelf: 'flex-start',
		marginTop: 1,
	},
});

export default function LinksScreen() {
	return (
		<ScrollView
			contentContainerStyle={styles.contentContainer}
			style={styles.container}
		>
			<OptionButton
				icon="md-school"
				label="Read the Expo documentation"
				onPress={() => {
					WebBrowser.openBrowserAsync('https://docs.expo.io');
				}}
			/>

			<OptionButton
				icon="md-compass"
				label="Read the React Navigation documentation"
				onPress={() => {
					WebBrowser.openBrowserAsync('https://reactnavigation.org');
				}}
			/>

			<OptionButton
				icon="ios-chatboxes"
				isLastOption
				label="Ask a question on the forums"
				onPress={() => {
					WebBrowser.openBrowserAsync('https://forums.expo.io');
				}}
			/>
		</ScrollView>
	);
}

function OptionButton({ icon, isLastOption, label, onPress }) {
	return (
		<RectButton
			onPress={onPress}
			style={[styles.option, isLastOption && styles.lastOption]}
		>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.optionIconContainer}>
					<Ionicons color="rgba(0,0,0,0.35)" name={icon} size={22} />
				</View>
				<View style={styles.optionTextContainer}>
					<Text style={styles.optionText}>{label}</Text>
				</View>
			</View>
		</RectButton>
	);
}

OptionButton.propTypes = {
	icon: PropTypes.string.isRequired,
	isLastOption: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onPress: PropTypes.func,
};

OptionButton.defaultProps = {
	isLastOption: false,
	onPress: () => {},
};
