import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './views/App';
import { appState } from './store/app_store';

const root = document.getElementById('app');
// //方案1
// ReactDOM.render(<App/>,root);
// 热加载方案2
const render = (Component) => {
    const renderMethod = ReactDOM.hydrate;
    renderMethod(
        <AppContainer>
            <Provider appState={appState}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    );
};
render(App);
if (module.hot) { // 热加载发生时
    module.hot.accept('./views/App', () => {
        // eslint-disable-line 注释告诉eslint不要检查这一行
        const nextComponent = require('./views/App').default;// eslint-disable-line
        render(nextComponent);
    });
}
