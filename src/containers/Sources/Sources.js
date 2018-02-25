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
import { createStructuredSelector } from 'reselect';
import StackGrid from "react-stack-grid";
import sizeMe from "react-sizeme";

import withReducer from "../../utils/withReducer";
import withSaga from "../../utils/withSaga";

import Source from "./../../components/Source";

import makeSelectSources from './selectors';
import reducer from "./reducer";
import saga from "./saga";
import { fetchSourcesRequest } from "./actions";

export class Sources extends React.Component {
  state = {
    sources: []
  };

  componentDidMount() {
    this.props.fetchSourcesRequest();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.sources && nextProps.sources.data.length) {
      this.setState({ sources: nextProps.sources.data[0].sources });
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

  render() {
    const { size } = this.props;

    return (
      <div>
        <Helmet>
          <title>Sources</title>
          <meta name="description" content="List of Sources" />
        </Helmet>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <StackGrid columnWidth={this.withBySize(size.width)} gutterWidth={10}>
            {this.state.sources.map(item => <Source source={item} />)}
          </StackGrid>
        </div>
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

// const mapStateToProps = state => ({
//   sources: state.sources
// });

const mapStateToProps = createStructuredSelector({
  sources: makeSelectSources(),
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
