import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { observable } from 'mobx';
import App from './views/App';
import { AppStore, TopicStore } from './store/store';
import thme from './theme';


const root = document.getElementById('app');
const initialStates = window.__INITIAL_STATES__ || {};// eslint-disable-line

const stores = {
    appStore: new AppStore({ ...initialStates }),
    topicStore: new TopicStore(),
};
observable(stores);
// 热加载方案2
const render = (Component) => {
    const renderMethod = ReactDOM.render;
    renderMethod(
        <AppContainer>
            <Provider stores={stores}>
                <MuiThemeProvider theme={thme}>
                    <BrowserRouter>
                        <Component />
                    </BrowserRouter>
                </MuiThemeProvider>
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
