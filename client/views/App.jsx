import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/routerConfig';

// import { hot } from 'react-hot-loader';
const app = () => (
    <div>
        <h1>KKKDinema</h1>
        <Link to="/">首页</Link>
        <br />
        <Link to="/details">详情</Link>
        <Routes />
    </div>
);
// export default hot(module)(app);
export default app;
