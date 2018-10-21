import React from 'react';
import { hot } from 'react-hot-loader';
// import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Container from '../layout/Container';
import TopicList from './TopicList';
// import Routes from '../config/router_config';

const App = () => (
    <div>
        <Header />
        <Container>
            <TopicList />
        </Container>
    </div>
);
export default hot(module)(App);
