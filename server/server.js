const express = require('express');
const path = require('path');
const fs = require('fs');
const serverRender = require('react-dom/server');//服务器渲染
const serveFavicon = require('serve-favicon'); // 网站图标中间件
const session = require('express-session');
const bodyParser = require('body-parser');
const queryString = require('query-string');

let app = express();
app.use(session({
    secret: 'react',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000
    },
    name: "tid"
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/user",require("../utils/login_proxy"));
app.use("/api/user",require("../utils/proxy"));
app.use(serveFavicon(path.join(__dirname, "/favicon.ico")));// 注册网站图标中间价
const isDev = process.env.NODE_ENV === 'development';
if (!isDev) {//非开发环境
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies

    const serverEntry = require('../build/server.entry').default;
    app.use('/public', express.static(path.join(__dirname, '../build')));
    let indexTempateHtml = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf-8');
    app.get('*', (req, resp) => {
        let renderHtml = serverRender.renderToString(serverEntry);
        renderHtml = indexTempateHtml.replace('<!--app-->', renderHtml);
        resp.send(renderHtml);
    });

} else {
    const devStatic = require('../utils/dev_static');
    devStatic(app);
}
app.listen(3333, () => {
    console.log('server listening at http://localhost:3333')
});
