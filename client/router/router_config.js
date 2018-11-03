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
import connectedAuthWrapper from './connectedAuthWrapper';

const render = () => (
    <Redirect to="/list" />
);

// 没有登录用户重定向到登录页面
const authUserInfo = connectedAuthWrapper({// 定义授权规则
    FailureComponent: () => <Redirect to={routerUrl.signIn} />, // 授权失败显示的组件
    authenticatedSelector: stores => stores.stores.appStore.logined, // 授权规则-->只允许登录用户查看
    wrapperDisplayName: 'AuthUserInfo',
});

// 对于登录用户登去登录页面将被重定向到个人信息页面
const visiableSignIn = connectedAuthWrapper({
    FailureComponent: () => <Redirect to={routerUrl.userInfo} />, // 授权失败显示的组件
    authenticatedSelector: stores => !stores.stores.appStore.logined, // 授权规则-->登录用户不可见登录页面，重定向到个人信息页面
    wrapperDisplayName: 'VisiableSignIn',
});

export default () => [
    <Route path={routerUrl.root} component={render} key="root-route" exact />,
    <Route path={routerUrl.topicList} component={TopicList} key="list-route" />,
    <Route path={`${routerUrl.topicDetail}/:id`} component={TopicDetail} key="detail-router" />,
    <Route path={routerUrl.signIn} component={visiableSignIn(SignIn)} key="signIn-router" />,
    <Route path={routerUrl.userInfo} component={authUserInfo(UserInfo)} key="userInfo-router" />,
];
