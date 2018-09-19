import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Divider, Tag, Tooltip } from 'antd';
import ProgressiveImage from './../../components/ProgressiveImage';
import Image from './../../components/ProgressiveImage/image.png';
const { Meta } = Card;

class NewsComponent extends Component {
	render() {
		const { news } = this.props;
		return (
			<Tooltip placement="top" title={news.title}>
				<Card
					cover={news.urlToImage ? <ProgressiveImage preview={Image} image={news.urlToImage} /> : null}
					actions={[ <Icon type="link" onClick={() => window.open(news.url, '_blank')} /> ]}
				>
					<Meta title={news.title} description={news.description} />
					<Divider dashed />
					<Tag color="geekblue" onClick={() => window.open(`http://${news.source.name}`, '_blank')}>
						{news.source.name}
					</Tag>
				</Card>
			</Tooltip>
		);
	}
}

NewsComponent.defaultProps = {
	news: {}
};

NewsComponent.propTypes = {
	news: PropTypes.object.isRequired
};

export default NewsComponent;
