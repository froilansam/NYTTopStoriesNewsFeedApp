import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';

import utils from '~/utils';

import style from './SectionButton.style';

const SectionButton = ({ auth, bottom, handleSection, top }) => {
	const selectedSection = _.get(auth, 'selectedSection', null);

	/**
	 * Section Button Component
	 * @param {Object} data - Object of articles
	 */
	const renderSectionButton = (data) => {
		const dataValue = _.get(data, 'value', null);
		const dataLabel = _.get(data, 'label', null);
		return (
			<TouchableOpacity onPress={() => handleSection(dataValue)}>
				<View
					style={[
						{
							backgroundColor:
								selectedSection === dataValue
									? 'black'
									: '#fff',
						},
						style.sbView,
					]}
				>
					<Text
						style={[
							{
								color:
									selectedSection === dataValue
										? '#fff'
										: 'black',
							},
							style.sbText,
						]}
					>
						{dataLabel}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View>
			{renderSectionButton(top)}
			{/* // There are instances that the sections are not odd number in length so sometimes there are no bottom button */}
			{!!bottom && renderSectionButton(bottom)}
		</View>
	);
};

SectionButton.propTypes = {
	auth: PropTypes.shape({}).isRequired,
	bottom: PropTypes.shape({}).isRequired,
	handleSection: PropTypes.func.isRequired,
	top: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default utils.compose(connect(mapStateToProps))(SectionButton);
