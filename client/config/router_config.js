import React from 'react';
import {
    Route,
} from 'react-router-dom';
import TopicList from '../views/topic-list';
import TopicDetail from '../views/topic-details';

export default () => [
    <Route path="/" component={TopicList} key="first" exact />,
    <Route path="/details" component={TopicDetail} key="secound" />,
];
