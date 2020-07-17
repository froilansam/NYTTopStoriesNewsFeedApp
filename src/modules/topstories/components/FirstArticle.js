import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import utils from '~/utils';
import layout from '~/constants/layout';

const FirstArticle = ({
	article,
	auth,
	handleSaveUnsaveArticle,
	navigation,
}) => {
	const offlineArticles = _.get(auth, 'offlineArticles', []);
	const isDownloaded = offlineArticles.find((articleInfo) => {
		return articleInfo.url === article.url;
	});

	return (
		<TouchableOpacity
			onPress={() => {
				return navigation.navigate('ARTICLE_SCREEN', {
					article_url: _.get(article, 'url', null),
				});
			}}
		>
			<View style={{ backgroundColor: '#fff', elevation: 4 }}>
				<View>
					<Image
						source={{
							uri: _.get(article, 'multimedia[0].url', null),
						}}
						style={{
							width: layout.window.width,
							height: 200,
						}}
					/>
				</View>
				{!!_.get(article, 'byline', null) && (
					<>
						<View>
							<Text
								style={{
									fontFamily: 'Roboto',
									fontSize: 15,
									marginHorizontal: 10,
									marginTop: 10,
								}}
							>
								{_.get(article, 'byline', null)
									.split('By ')[1]
									.toUpperCase()}
							</Text>
						</View>
					</>
				)}
				<View>
					<Text
						style={{
							fontFamily: 'Cheltenham',
							fontSize: 30,
							marginHorizontal: 10,
							marginBottom: 10,
						}}
					>
						{_.get(article, 'title', null)}
					</Text>
				</View>

				<View>
					<Text
						style={{
							fontFamily: 'Imperial',
							fontSize: 15,
							color: '#666666',
							margin: 10,
						}}
					>
						{_.get(article, 'abstract', null)}
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 10,
					}}
				>
					<Text
						style={{
							fontFamily: 'Imperial',
							fontSize: 15,
							color: '#666666',
							marginHorizontal: 10,
							marginBottom: 10,
							alignSelf: 'flex-start',
						}}
					>
						{moment(
							_.get(article, 'published_date', null),
						).fromNow()}
					</Text>
					<View
						style={{
							justifyContent: 'flex-end',
							flexDirection: 'row',
							marginBottom: 10,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								handleSaveUnsaveArticle(
									article,
									isDownloaded,
									offlineArticles,
								);
							}}
						>
							<View>
								<Icon
									name={
										isDownloaded ? 'checkmark' : 'download'
									}
									style={{ marginHorizontal: 20 }}
									type="Ionicons"
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

FirstArticle.propTypes = {
	article: PropTypes.shape().isRequired,
	auth: PropTypes.shape().isRequired,
	handleSaveUnsaveArticle: PropTypes.func.isRequired,
	navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default utils.compose(connect(mapStateToProps))(FirstArticle);
