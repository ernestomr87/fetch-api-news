import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Input, Select, Form } from "antd";
import styled from "styled-components";
import { categories, languages, countries } from "./../../fixtures/sources";

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

const ColFilter = styled(Col)`
  text-align: center;
`;

class FiltersComponent extends Component {
  state = {
    string: null,
    category: "all",
    language: "all",
    country: "all",

    categories: [],
    countries: [],
    languages: []
  };

  componentDidMount = () => {
    this.reset();
  };

  reset = () => {
    this.setState({ categories, countries, languages });
  };

  handleSearch = string => {
    this.filter({ string });
  };

  handleChangeCategory = category => {
    this.filter({ category });
  };

  handleChangeCountry = country => {
    this.filter({ country });
  };

  handleChangeLanguage = language => {
    this.filter({ language });
  };

  filter = values => {
    console.log(values);
    let filter = {
      string: this.state.string,
      category: this.state.category,
      language: this.state.language,
      country: this.state.country
    };

    filter = Object.assign({}, filter, values);
    this.setState(values);
    this.props.filter(filter);
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 16 }
      }
    };

    const formSeacrhLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 17 }
      }
    };
    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={22}>
            <Row>
              <Form>
                <ColFilter xs={24} md={8}>
                  <FormItem label="Search" {...formSeacrhLayout} colon={false}>
                    <Search
                      placeholder="input search text"
                      onSearch={this.handleSearch}
                      enterButton
                    />
                  </FormItem>
                </ColFilter>
                <ColFilter xs={24} md={5}>
                  <FormItem label="Category" {...formItemLayout} colon={false}>
                    <Select
                      defaultValue="all"
                      onChange={this.handleChangeCategory}
                    >
                      <Option value="all">All</Option>
                      {this.state.categories.map(item => (
                        <Option key={item.value} value={item.value}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </ColFilter>
                <ColFilter xs={24} md={5}>
                  <FormItem label="Language" {...formItemLayout} colon={false}>
                    <Select
                      defaultValue="all"
                      onChange={this.handleChangeLanguage}
                    >
                      <Option value="all">All</Option>
                      {this.state.languages.map(item => (
                        <Option key={item.value} value={item.value}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </ColFilter>
                <ColFilter xs={24} md={5}>
                  <FormItem label="Country" {...formItemLayout} colon={false}>
                    <Select
                      defaultValue="all"
                      onChange={this.handleChangeCountry}
                    >
                      <Option value="all">All</Option>
                      {this.state.countries.map(item => (
                        <Option key={item.value} value={item.value}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </ColFilter>
              </Form>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

FiltersComponent.propTypes = {
  filter: PropTypes.func.isRequired
};

export default FiltersComponent;
