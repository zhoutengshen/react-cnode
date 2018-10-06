const reactAsyncBootstrpper = require("react-async-bootstrapper");
module.exports = (bundle, template, req, resp,next) => {
    //服务端渲染；
    let ssr = require("react-dom/server");
    const serverEntry = bundle.default;
    const { createAppState, AppStateClass } = bundle;
    let routerContext = {};
    let url = req.path;
    const appState = createAppState();
    let app = serverEntry({ appState }, routerContext, url);
    reactAsyncBootstrpper(app)
        .then(() => {
            let app = serverEntry({ appState }, routerContext, url);
            const serverRenderHtml = ssr.renderToString(app);
            //服务端渲染不处理Redirect，routerContext为{ action: 'REPLACE',location: { pathname: '', search: '', hash: '', state: any },url: '' }。
            //所以，我么需要手动重定向
            if (routerContext.url && url !== routerContext.url) {
                resp.status(302).setHeader('Location', routerContext.url);
                resp.send();
            }
            //插入脚本,解决客户端数据
            let scriptStr = `
                           <script>
                           window.__INITIAL_STATES__ = ${JSON.stringify(appState)}
                           <\/script>
                       `;
            template = template.replace("<!--script-->", scriptStr);
            resp.send(template.replace("<!--app-->", serverRenderHtml));
        })
        .catch((error) => {
            next();
        });
}
