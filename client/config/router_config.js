import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import TopicList from '../views/TopicList';
import TopicDetail from '../views/TopicDetails';
import ApiTestPage from '../views/test-pages/apiTestPage';

const render = () => (
    <Redirect to="/list" />
);
export default () => [
    <Route path="/" render={render} key="one" exact />,
    <Route path="/details" component={TopicDetail} key="secound" />,
    <Route path="/apiTestPage" component={ApiTestPage} key="thiry" />,
    <Route path="/list" component={TopicList} key="four" />,
];
