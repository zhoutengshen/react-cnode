import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import TopicList from '../views/TopicList';
import { routerUrl } from '../defaultData';
import TopicDetail from '../views/TopicDetails';
import SignIn from '../views/user/SignIn';
import UserInfo from '../views/user/UserInfo';

const render = () => (
    <Redirect to="/list" />
);
// export default () => [
//     <Route path="/" render={render} key="one" exact />,
//     <Route path="/details" component={TopicDetail} key="secound" />,
//     <Route path="/apiTestPage" component={ApiTestPage} key="thiry" />,
//     <Route path="/list" component={TopicList} key="four" />,
// ];

export default () => [
    <Route path={routerUrl.root} render={render} key="root-route" exact />,
    <Route path={routerUrl.topicList} component={TopicList} key="list-route" />,
    <Route path={`${routerUrl.topicDetail}/:id`} component={TopicDetail} key="detail-router" />,
    <Route path={routerUrl.signIn} component={SignIn} key="signIn-router" />,
    <Route path={routerUrl.userInfo} component={UserInfo} key="userInfo-router" />,
];
