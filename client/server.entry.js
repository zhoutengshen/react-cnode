import React from 'react';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider, useStaticRendering } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import App from './views/App';
import  { AppStore,TopicStore } from './store/store';


useStaticRendering(true);
export default (stores, routerContext, url, registry, theme) => (
    <Provider {...stores}>
        <JssProvider registry={registry}>
            <MuiThemeProvider theme={theme}>
                <StaticRouter context={routerContext} location={url}>
                    <App />
                </StaticRouter>
            </MuiThemeProvider>
        </JssProvider>
    </Provider>
);
export {
    AppStore,
    TopicStore,
};
