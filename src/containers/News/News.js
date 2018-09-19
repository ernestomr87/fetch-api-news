/**
 *
 * news
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import StackGrid from "react-stack-grid";
import sizeMe from "react-sizeme";
import { Spin, message, Row, Col } from "antd";
import withReducer from "../../utils/withReducer";
import withSaga from "../../utils/withSaga";

import NewsComponent from "./../../components/News";
import Filters from "./../../components/Filters";

import makeSelectNews from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { fetchNewsRequest } from "./actions";

export class News extends React.Component {
  state = {
    news: [],
    filterNews: []
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.news.data.length && !this.props.news.data.length) {
      const sources = nextProps.news.data;
      let articles = [];
      sources.forEach(source => {
        source.articles.forEach(article => {
          articles.push(article);
        });
      });

      this.setState({
        news: articles,
        filterNews: articles
      });
    }
    if (nextProps.news.error && !this.props.news.error) {
      message.error(nextProps.news.error.message);
    }
  };

  withBySize(width) {
    if (width >= 1200) {
      return "20%";
    } else if (width >= 750 && width <= 1200) {
      return "33.33%";
    }
    return "100%";
  }

  filter = filters => {
    let query = `${filters.endPoint}?`;
    if (filters.country !== "All") query += `country=${filters.country}&`;
    if (filters.category !== "All") query += `category=${filters.category}&`;
    if (filters.string) query += `q=${filters.string}&`;
    this.setState({
      news: [],
      filterNews: []
    });
    this.props.fetchNewsRequest({ query });
  };

  renderNews = () => {
    const { filterNews } = this.state;
    return filterNews.map(item => <NewsComponent key={item.id} news={item} />);
  };

  render() {
    const { size, news } = this.props;

    return (
      <div>
        <Helmet>
          <title>News</title>
          <meta name="description" content="List of news" />
        </Helmet>
        <Spin tip="Loading..." spinning={news.loading}>
          <div style={{ background: "#ECECEC", padding: "30px" }}>
            <Row type="flex" justify="center">
              <Col span={4}>
                <h1>News</h1>
              </Col>
            </Row>
            <Filters news={true} filter={this.filter.bind(this)} />
            {this.state.filterNews.length ? (
              <StackGrid
                columnWidth={this.withBySize(size.width)}
                gutterWidth={10}
              >
                {this.renderNews()}
              </StackGrid>
            ) : null}
          </div>
        </Spin>
      </div>
    );
  }
}

News.defaultProps = {
  news: {}
};

News.propTypes = {
  news: PropTypes.object.isRequired,
  size: PropTypes.any.isRequired
};

const mapStateToProps = createStructuredSelector({
  news: makeSelectNews()
});

const withConnect = connect(mapStateToProps, { fetchNewsRequest });

// Create the config
const config = { monitorHeight: true };

// Call SizeMe with the config to get back the HOC.
const sizeMeHOC = sizeMe(config);

export default compose(
  withConnect,
  withSaga({ key: "news", saga }),
  withReducer({ key: "news", reducer })
)(sizeMeHOC(News));
