import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import utils from '~/utils';

import { isArticleDownloaded } from '../topstories.library';

const SucceedingArticle = ({
	auth,
	handleSaveUnsaveArticle,
	index,
	item: article,
	navigation,
}) => {
	if (index !== 0) {
		const offlineArticles = _.get(auth, 'offlineArticles', []);
		const isDownloaded = isArticleDownloaded(offlineArticles, article);
		const articleURL = _.get(article, 'url', null);
		const multimediaURL = _.get(article, 'multimedia[0].url', null);
		const byLine = _.get(article, 'byline', null);
		const title = _.get(article, 'title', null);
		const abstract = _.get(article, 'abstract', null);
		const publishedDate = moment(
			_.get(article, 'published_date', null),
		).fromNow();

		return (
			<TouchableOpacity
				onPress={() => {
					return navigation.navigate('ARTICLE_SCREEN', {
						article_url: articleURL,
					});
				}}
			>
				<View
					style={{
						backgroundColor: '#fff',
						elevation: 4,
						marginTop: 10,
						paddingTop: 10,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
						}}
					>
						<View
							style={{
								flexDirection: 'column',
								width: '70%',
							}}
						>
							{!!byLine && (
								<View>
									<Text
										style={{
											fontFamily: 'Roboto',
											fontSize: 13,
											marginHorizontal: 10,
											marginTop: 10,
										}}
									>
										{byLine
											.replace('By ', '')
											.toUpperCase()}
									</Text>
								</View>
							)}
							<View>
								<Text
									style={{
										fontFamily: 'Cheltenham',
										fontSize: 25,
										marginHorizontal: 10,
										marginBottom: 5,
									}}
								>
									{title}
								</Text>
							</View>
							<View>
								<Text
									style={{
										fontFamily: 'Imperial',
										fontSize: 15,
										color: '#666666',
										marginHorizontal: 10,
										marginTop: 5,
									}}
								>
									{abstract}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'column',
								width: '30%',
								padding: 10,
							}}
						>
							<Image
								source={{
									uri: multimediaURL,
								}}
								style={{
									width: 80,
									height: 80,
								}}
							/>
						</View>
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
							{publishedDate}
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
											isDownloaded
												? 'checkmark'
												: 'download'
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
	}

	return null;
};

SucceedingArticle.propTypes = {
	auth: PropTypes.shape({}).isRequired,
	handleSaveUnsaveArticle: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	item: PropTypes.shape({}).isRequired,
	navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
		.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default utils.compose(connect(mapStateToProps))(SucceedingArticle);