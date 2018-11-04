import React from 'react';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
// import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Container from '../layout/Container';
// import RouterConfig from '../router/router_config';
import routesconfig from '../router/config';


const App = ({ classes }) => (
    <div className={classes.root}>
        <Header />
        <Container>
            {renderRoutes(routesconfig)}
        </Container>
    </div>
);
App.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default hot(module)(withStyles(theme => ({
    root: {
        '& ::-webkit-scrollbar':
        {
            marginTop: 64,
            width: 8,
            borderRadius: 10,
            backgroundColor: theme.palette.grey[500],
        },
        '& ::-webkit-scrollbar-track':
        {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.3)',
            borderRadius: 10,
            'background-color': theme.palette.grey[100],
        },
        '& ::-webkit-scrollbar-thumb':
        {
            borderRadius: 10,
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,.3)',
            height: 100,
            backgroundColor: theme.palette.grey[300],
        },
    },
}))(App));
