import React from 'react';
import {
    Route,
} from 'react-router-dom';
import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-details/index';

export default () => [
    <Route path="/" component={TopicList} exact />,
    <Route path="/details" component={TopicDetail} />,
];
