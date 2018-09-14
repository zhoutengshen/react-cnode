import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
let root = document.getElementById("app");
import { AppContainer } from "react-hot-loader";
// //方案1
// ReactDOM.render(<App/>,root);
//热加载方案2
const render = Component => {
    let renderMethod = ReactDOM.hydrate;
    renderMethod(
        <AppContainer>
            <Component />
        </AppContainer>
        ,
        root
    );
};
render(App);
if (module.hot) {//热加载发生时
    module.hot.accept("./App.jsx", () => {
        const nextComponent = require("./App").default;
        render(nextComponent);
    })
}
