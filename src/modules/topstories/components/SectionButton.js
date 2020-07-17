import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';

import utils from '~/utils';

const SectionButton = ({ auth, bottom, handleSection, top }) => {
	return (
		<View>
			<TouchableOpacity
				onPress={() => handleSection(_.get(top, 'value', null))}
			>
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
							_.get(auth, 'selectedSection', null) ===
							_.get(top, 'value', null)
								? 'black'
								: '#fff',
					}}
				>
					<Text
						style={{
							fontFamily: 'Imperial',
							fontSize: 17,
							color:
								_.get(auth, 'selectedSection', null) ===
								_.get(top, 'value', null)
									? '#fff'
									: 'black',
						}}
					>
						{_.get(top, 'label', null)}
					</Text>
				</View>
			</TouchableOpacity>
			{!!_.get(bottom, 'value', null) && (
				<TouchableOpacity
					onPress={() => handleSection(_.get(bottom, 'value', null))}
				>
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
								_.get(auth, 'selectedSection', null) ===
								_.get(bottom, 'value', null)
									? 'black'
									: '#fff',
						}}
					>
						<Text
							style={{
								fontFamily: 'Imperial',
								fontSize: 17,
								color:
									_.get(auth, 'selectedSection', null) ===
									_.get(bottom, 'value', null)
										? '#fff'
										: 'black',
							}}
						>
							{_.get(bottom, 'label', null)}
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
