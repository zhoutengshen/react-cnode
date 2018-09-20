import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/routerConfig';

const app = () => (
    <div>
        <h1>KKKDinema</h1>
        <Link to="/">首页</Link>
        <br />
        <Link to="/details">详情</Link>
        <Routes />
    </div>
);
export default app;
