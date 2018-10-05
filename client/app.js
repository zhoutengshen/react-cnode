import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './views/App';
import AppState from './store/app_store';

const root = document.getElementById('app');
const initialStates =  {};// eslint-disable-line

// 热加载方案2
const render = (Component) => {
    const renderMethod = ReactDOM.render;
    renderMethod(
        <AppContainer>
            <Provider appState={new AppState({ ...initialStates })}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    );
};

render(App);
// // 热加载方案1
// ReactDOM.render(<App />, root);
// if (module.hot) { // 热加载发生时
//     module.hot.accept('./views/App', () => {
//         // eslint-disable-line 注释告诉eslint不要检查这一行
//         const nextComponent = require('./views/App').default;// eslint-disable-line
//         render(nextComponent);
//     });
// }
