import React from 'react';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Container from '../layout/Container';
import RouterConfig from '../router/router_config';


const App = ({ classes }) => (
    <div className={classes.root}>
        <Header />
        <Container>
            <RouterConfig />
        </Container>
    </div>
);
App.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default hot(module)(withStyles(() => ({
    root: {
    },
}))(App));
