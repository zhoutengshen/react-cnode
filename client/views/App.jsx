import React from 'react';
import { hot } from 'react-hot-loader';
// import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Container from '../layout/Container';
import RouterConfig from '../config/router_config';


const App = () => (
    <div>
        <Header />
        <Container>
            <RouterConfig />
        </Container>
    </div>
);
export default hot(module)(App);
