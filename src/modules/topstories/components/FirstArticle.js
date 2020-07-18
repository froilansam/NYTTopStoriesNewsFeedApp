import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import utils from '~/utils';

import style from './FirstArticle.style';

import { isArticleDownloaded } from '../topstories.library';

const FirstArticle = ({
	article,
	auth,
	handleSaveUnsaveArticle,
	navigation,
}) => {
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

	/**
	 * This is the card for every first article of the sections.
	 * It is different on succeeding articles to give highlights.
	 */
	return (
		<TouchableOpacity
			onPress={() => {
				return navigation.navigate('ARTICLE_SCREEN', {
					article_url: articleURL,
				});
			}}
		>
			<View style={style.firstArticleView}>
				<View>
					<Image
						source={{
							uri: multimediaURL,
						}}
						style={style.firstArticleImage}
					/>
				</View>
				{!!byLine && (
					<>
						<View>
							<Text style={style.faByline}>
								{byLine.replace('By ', '').toUpperCase()}
							</Text>
						</View>
					</>
				)}
				<View>
					<Text style={style.faTitle}>{title}</Text>
				</View>

				<View>
					<Text style={style.faAbstract}>{abstract}</Text>
				</View>
				<View style={style.faArticleFooterView}>
					<Text style={style.faDate}>{publishedDate}</Text>
					<View style={style.faDownloadView}>
						{/* This is the Download Button Component */}
						<TouchableOpacity
							onPress={() => {
								handleSaveUnsaveArticle();
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
