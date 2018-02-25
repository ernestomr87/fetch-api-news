import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Tooltip, Tag, Divider } from "antd";

import { categories, languages, countries } from "./../../fixtures/sources";

class SourceComponent extends Component {
  state = {};

  renderCountryTag = () => {
    const { source } = this.props;
    if (source.country) {
      const tag = countries.find(elem => elem.value === source.country);
      if (tag) {
        const flag = `flag flag-${tag.value}`;
        return (
          <Tooltip placement="top" title={tag.name}>
            <img
              style={{ margin: "-5px 0 0 0px" }}
              src="/flags/blank.gif"
              className={flag}
              alt={tag.name}
            />
          </Tooltip>
        );
      }
    }
    return;
  };
  renderCategoryTag = () => {
    const { source } = this.props;
    const item = categories.find(elem => elem.value === source.category);
    if (item)
      return (
        <Tooltip placement="top" title={item.name + " categoy"}>
          <Tag color={item.color}>{item.name}</Tag>{" "}
        </Tooltip>
      );
    return;
  };
  renderLanguagesTag = () => {
    const { source } = this.props;
    if (source.country) {
      const tag = languages.find(elem => elem.value === source.language);
      if (tag) {
        return (
          <Tooltip placement="top" title={tag.name + " language"}>
            <Tag color={tag.color}>{tag.name}</Tag>
          </Tooltip>
        );
      }
    }
    return;
  };

  render() {
    const { source } = this.props;

    return (
      <Card title={source.name}>
        <Row type="flex" justify="center">
          <Col>{source.description}</Col>
          <Divider dashed />
          <Col> {this.renderCategoryTag()}</Col>
          <Col> {this.renderLanguagesTag()}</Col>
          <Col> {this.renderCountryTag()}</Col>
        </Row>
      </Card>
    );
  }
}

SourceComponent.defaultProps = {
  source: {}
};

SourceComponent.propTypes = {
  source: PropTypes.object.isRequired
};

export default SourceComponent;
