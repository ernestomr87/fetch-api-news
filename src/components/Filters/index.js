import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Input, Select, Form } from "antd";
import styled from "styled-components";
import { categories, languages, countries } from "./../../fixtures";

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

const ColFilter = styled(Col)`
  text-align: center;
`;

class FiltersComponent extends Component {
  state = {
    string: null,
    category: "All",
    language: "All",
    country: "All",
    endPoint: "top-headlines",

    categories: [],
    countries: [],
    languages: []
  };

  componentDidMount = () => {
    this.reset();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.news && !this.props.news) {
      this.handleChangeCountry("cu");
    }
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

  handleChangeEndPoint = endPoint => {
    this.filter({ endPoint });
  };

  filter = values => {
    let filter = null;
    if (this.props.news) {
      filter = {
        string: this.state.string,
        category: this.state.category,
        country: this.state.country,
        endPoint: this.state.endPoint
      };
    } else {
      filter = {
        string: this.state.string,
        category: this.state.category,
        language: this.state.language,
        country: this.state.country
      };
    }

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
                {!this.props.news ? (
                  <ColFilter xs={24} md={5}>
                    <FormItem
                      label="Language"
                      {...formItemLayout}
                      colon={false}
                    >
                      <Select
                        defaultValue={this.state.language}
                        onChange={this.handleChangeLanguage}
                      >
                        {this.state.languages.map(item => (
                          <Option key={item.value} value={item.value}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </ColFilter>
                ) : (
                  <ColFilter xs={24} md={5}>
                    <FormItem
                      label="EndPoint"
                      {...formItemLayout}
                      colon={false}
                    >
                      <Select
                        defaultValue={this.state.endPoint}
                        onChange={this.handleChangeEndPoint}
                      >
                        <Option value="top-headlines">Top headlines</Option>
                        <Option value="everything">Everything</Option>
                      </Select>
                    </FormItem>
                  </ColFilter>
                )}
                <ColFilter xs={24} md={5}>
                  <FormItem label="Category" {...formItemLayout} colon={false}>
                    <Select
                      defaultValue={this.state.category}
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
                  <FormItem label="Country" {...formItemLayout} colon={false}>
                    <Select
                      defaultValue={
                        this.props.news ? "Cuba" : this.state.country
                      }
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
  filter: PropTypes.func.isRequired,
  news: PropTypes.bool
};

export default FiltersComponent;
