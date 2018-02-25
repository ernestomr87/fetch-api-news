import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Layout, Button, Row, Col, Menu } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import styled from "styled-components";

import Sources from "../Sources";

const H1 = styled.h1`
  color: #f0f2f5;
  margin-bottom: 0;
  font-size: 20px;
  margin-right: 30px;
`;

const { Header: AntHeader, Content } = Layout;

const Header = styled(AntHeader)`
  &.ant-layout-header {
    display: flex;
    align-items: center;
  }
`;

class App extends Component {
  render() {
    const { route: { location } } = this.props;
    return (
      <Layout style={{ height: "100vh" }}>
        <Helmet titleTemplate="%s | Fetch-Api-News" />
        <Header>
          <Link to="/">
            {" "}
            <H1>Fetch ApiNews</H1>
          </Link>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={location.pathname}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="/sources">
              <Link to="/sources">Sources</Link>
            </Menu.Item>
            <Menu.Item key="/news">
              <Link to="/news">News</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route exact path="/sources" component={Sources} />
            <Route exact path="/" render={() => <Redirect to="/sources" />} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  route: state.route
});

const WrappedApp = connect(mapStateToProps, {})(App);

export default WrappedApp;
