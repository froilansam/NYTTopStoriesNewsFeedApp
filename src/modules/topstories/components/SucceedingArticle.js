import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import utils from '~/utils';

import { isArticleDownloaded } from '../topstories.library';

import style from './SucceedingArticle.style';
import faStyle from './FirstArticle.style';

const SucceedingArticle = ({
	auth,
	handleSaveUnsaveArticle,
	index,
	item: article,
	navigation,
}) => {
	// Putting this here so that it won't render the first article again
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

		// Succeeding Articles Component
		return (
			<TouchableOpacity
				onPress={() => {
					return navigation.navigate('ARTICLE_SCREEN', {
						article_url: articleURL,
					});
				}}
			>
				<View style={style.saView}>
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
									<Text style={style.saByline}>
										{byLine
											.replace('By ', '')
											.toUpperCase()}
									</Text>
								</View>
							)}
							<View>
								<Text style={style.saTitle}>{title}</Text>
							</View>
							<View>
								<Text style={style.saAbstract}>{abstract}</Text>
							</View>
						</View>
						<View style={style.saImageView}>
							<Image
								source={{
									uri: multimediaURL,
								}}
								style={style.saImage}
							/>
						</View>
					</View>
					<View style={faStyle.faArticleFooterView}>
						<Text style={faStyle.faDate}>{publishedDate}</Text>
						<View style={faStyle.faDownloadView}>
							<TouchableOpacity
								onPress={() => {
									handleSaveUnsaveArticle();
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
