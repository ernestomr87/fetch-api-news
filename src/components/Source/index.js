import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

class SourceComponent extends Component {
  state = {};
  render() {
    const { source } = this.props;
    return <Card title={source.name}>{source.description}</Card>;
  }
}

SourceComponent.defaultProps = {
  source: {}
};

SourceComponent.propTypes = {
  source: PropTypes.object.isRequired
};

export default SourceComponent;
