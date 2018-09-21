import React from 'react';
import ServerRouter from 'react-router-dom/StaticRouter';
import { Provider } from 'mobx-react';
import { appState } from './store/app_store';
import App from './views/App';

export default (
    <Provider appState={appState}>
        <ServerRouter>
            <App />
        </ServerRouter>
    </Provider>
);
