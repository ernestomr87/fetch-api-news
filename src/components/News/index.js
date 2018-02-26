import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Icon, Divider, Tag } from "antd";
var moment = require("moment");
const { Meta } = Card;

class NewsComponent extends Component {
  render() {
    const { news } = this.props;
    return (
      <Card
        cover={
          news.urlToImage ? (
            <img alt={news.title} src={news.urlToImage} />
          ) : null
        }
        actions={[
          <Icon type="link" onClick={() => window.open(news.url, "_blank")} />
        ]}
      >
        <Meta title={news.title} description={news.description} />
        <Divider dashed />
        <Tag
          color="geekblue"
          onClick={() => window.open(`http://${news.source.name}`, "_blank")}
        >
          {news.source.name}
        </Tag>
      </Card>
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
