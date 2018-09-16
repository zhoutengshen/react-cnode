import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const root = document.getElementById('app');
// //方案1
// ReactDOM.render(<App/>,root);
// 热加载方案2
const render = (Component) => {
    const renderMethod = ReactDOM.hydrate;
    renderMethod(
        <AppContainer>
            <Component />
        </AppContainer>,
        root,
    );
};
render(App);
if (module.hot) { // 热加载发生时
    module.hot.accept('./App.jsx', () => {
        // eslint-disable-line 注释告诉eslint不要检查这一行
        const nextComponent = require('./App').default;// eslint-disable-line
        render(nextComponent);
    });
}
