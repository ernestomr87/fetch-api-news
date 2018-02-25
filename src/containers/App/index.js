import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import {  Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from '../Home';

const H1 = styled.h1`
  font-size: 1.5em;
  color: #61dafb;

  margin-bottom: 0;

  text-transform: uppercase;
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
    return (
      <Layout>
        <Helmet titleTemplate="%s | Fetch-Api-News" />
        <Header>
          <H1>Fetch-Api-News</H1>
        </Header>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default App;
