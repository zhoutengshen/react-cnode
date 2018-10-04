import React from 'react';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './views/App';
import AppStateClass, { createAppState } from './store/store';

useStaticRendering(true);
export default (stores, routerContext, url) => (
    <Provider {...stores}>
        <StaticRouter context={routerContext} location={url}>
            <App />
        </StaticRouter>
    </Provider>
);
export {
    AppStateClass,
    createAppState,
};
