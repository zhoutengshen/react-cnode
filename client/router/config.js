import React from 'react';
import {
    Redirect,
} from 'react-router-dom';
import TopicList from '../views/TopicList';
import { routerUrl } from '../defaultData';
import TopicDetail from '../views/TopicDetails';
import {
    AuthedUserInfo,
    AuthedSignIn,
} from './authedComponent';

const routesConfig = [
    {
        component: () => <Redirect to={routerUrl.topicList} />,
        path: routerUrl.root,
        exact: true,
    },
    {
        component: TopicList,
        path: routerUrl.topicList,
    },
    {
        component: TopicDetail,
        path: `${routerUrl.topicDetail}/:id`,
    },
    {
        component: AuthedSignIn,
        path: routerUrl.signIn,
    },
    {
        path: routerUrl.userInfo,
        component: AuthedUserInfo,
    },
];
export default routesConfig;
