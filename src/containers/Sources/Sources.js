/**
 *
 * Sources
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
import { Spin, message } from "antd";
import withReducer from "../../utils/withReducer";
import withSaga from "../../utils/withSaga";

import Source from "./../../components/Source";
import Filters from "./../../components/Filters";

import makeSelectSources from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { fetchSourcesRequest } from "./actions";

export class Sources extends React.Component {
  state = {
    sources: [],
    filterSources: []
  };

  componentDidMount() {
    this.props.fetchSourcesRequest();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.sources.data.length && !this.props.sources.data.length) {
      this.setState({
        sources: nextProps.sources.data[0].sources,
        filterSources: nextProps.sources.data[0].sources
      });
    }
    if (nextProps.sources.error && !this.props.sources.error) {
      message.error(nextProps.sources.error.message);
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
    let filterSources = this.state.sources;
    let flag = false;
    if (filters.string) {
      filterSources = filterSources.filter(elem => {
        console.log(elem);
        return elem.name.toLowerCase().indexOf(filters.string) >= 0;
      });
      flag = true;
    }
    if (filters.category !== "All") {
      filterSources = filterSources.filter(
        elem => elem.category === filters.category
      );
      flag = true;
    }
    if (filters.language !== "All") {
      filterSources = filterSources.filter(
        elem => elem.language === filters.language
      );
      flag = true;
    }
    if (filters.country !== "All") {
      filterSources = filterSources.filter(
        elem => elem.country === filters.country
      );
      flag = true;
    }

    if (flag) {
      this.setState({ filterSources });
    } else {
      this.setState({ filterSources: this.state.sources });
    }
  };

  render() {
    const { size, sources } = this.props;

    return (
      <div>
        <Helmet>
          <title>Sources</title>
          <meta name="description" content="List of Sources" />
        </Helmet>
        <Spin tip="Loading..." spinning={sources.loading}>
          <div style={{ background: "#ECECEC", padding: "30px" }}>
            <h1>Sources</h1>
            <Filters filter={this.filter.bind(this)} />
            <StackGrid
              columnWidth={this.withBySize(size.width)}
              gutterWidth={10}
            >
              {this.state.filterSources.map(item => <Source key={item.id} source={item} />)}
            </StackGrid>
          </div>
        </Spin>
      </div>
    );
  }
}

Sources.defaultProps = {
  sources: {}
};

Sources.propTypes = {
  sources: PropTypes.object.isRequired,
  size: PropTypes.any.isRequired
};

const mapStateToProps = createStructuredSelector({
  sources: makeSelectSources()
});

const withConnect = connect(mapStateToProps, { fetchSourcesRequest });

// Create the config
const config = { monitorHeight: true };

// Call SizeMe with the config to get back the HOC.
const sizeMeHOC = sizeMe(config);

export default compose(
  withConnect,
  withSaga({ key: "sources", saga }),
  withReducer({ key: "sources", reducer })
)(sizeMeHOC(Sources));
