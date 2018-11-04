const httpProxy = require("http-proxy-middleware")//代理
const serverRender = require("./server_render");
const config = require("../webpackConfig/server.config");
const bundleGenerater = require("./server_bundle_hot_load")(config);
const axios = require("axios");

const getHtmlTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/public/index.html")
            .then(resp => {
                resolve(resp.data);
            })
            .catch(erroe => {
                reject(erroe);
            });
    });
    // let htmlTemplate = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /></head><body><!--style--><div id='app'><!--app--></div><!--script--></body></html>`;
    // return new Promise((resolve, react) => {
    //     resolve(htmlTemplate);
    // });
};

module.exports = function (app) {
    app.use("/public", httpProxy({//将所有/pblic请求代理到webpack-dev-server的服务器下
        target: "http://localhost:3000"
    }));
    //被代理的请求不会再被get请求处理
    app.get("*", function (req, resp,next) {//客户端请求，我们需要返回一个html模板
        getHtmlTemplate().then(template => {
            let bundle = bundleGenerater();
            serverRender(bundle, template, req, resp,next);
        }).catch(error => resp.send(error.toString()))
    });

}; 
