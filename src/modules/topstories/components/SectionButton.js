import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';

import utils from '~/utils';

const SectionButton = ({ auth, bottom, handleSection, top }) => {
	const selectedSection = _.get(auth, 'selectedSection', null);
	const topValue = _.get(top, 'value', null);
	const topLabel = _.get(top, 'label', null);
	const bottomValue = _.get(bottom, 'value', null);
	const bottomLabel = _.get(bottom, 'label', null);

	return (
		<View>
			<TouchableOpacity onPress={() => handleSection(topValue)}>
				<View
					style={{
						borderColor: 'black',
						borderWidth: 1,
						paddingVertical: 5,
						width: 130,
						borderRadius: 10,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 10,
						marginHorizontal: 2,
						backgroundColor:
							selectedSection === topValue ? 'black' : '#fff',
					}}
				>
					<Text
						style={{
							fontFamily: 'Imperial',
							fontSize: 17,
							color:
								selectedSection === topValue ? '#fff' : 'black',
						}}
					>
						{topLabel}
					</Text>
				</View>
			</TouchableOpacity>
			{!!bottomValue && (
				<TouchableOpacity onPress={() => handleSection(bottomValue)}>
					<View
						style={{
							borderColor: 'black',
							borderWidth: 1,
							paddingVertical: 5,
							width: 130,
							borderRadius: 10,
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 10,
							marginHorizontal: 2,
							backgroundColor:
								selectedSection === bottomValue
									? 'black'
									: '#fff',
						}}
					>
						<Text
							style={{
								fontFamily: 'Imperial',
								fontSize: 17,
								color:
									selectedSection === bottomValue
										? '#fff'
										: 'black',
							}}
						>
							{bottomLabel}
						</Text>
					</View>
				</TouchableOpacity>
			)}
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
