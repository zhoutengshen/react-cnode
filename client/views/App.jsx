import React from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import Routes from '../config/router_config';

const App = () => (
    <div>
        <h1>KKKkhhhhhKKKKjjjjjjjjjKLJKLAKKm</h1>
        <Link to="/">主页</Link>
        <br />
        <Link to="/list">列表</Link>
        <br />
        <Link to="/details">详细</Link>
        <br />
        <Link to="/apiTestPage">ApiTestPages</Link>
        <Routes />
    </div>
);
export default hot(module)(App);
