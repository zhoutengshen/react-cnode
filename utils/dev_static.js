const axios = require("axios");
const path = require("path");
const webpack = require("webpack");
const config = require("../webpackConfig/server.config");
const memoryFs = require("memory-fs");
const httpProxy = require("http-proxy-middleware")//代理
//获取html模板,开发环境中的模板存在于内存中，不在硬盘，可以使用http请求获取，这里使用axios
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
};
const complie = webpack(config);//这里默认编译后的文件将储存到硬盘
const mmfs = new memoryFs();
complie.outputFileSystem = mmfs;//webpakc打包后文件将储存到内存
const str2JSModule = (src) => {
    let Module = module.constructor;
    let m = new Module();
    m._compile(src, "server.entry.js");
    return m.exports;
}
let bund;
complie.watch({}, (err, states) => {//这里监视源文件，一旦发生更改将触发这个函数
    if (err) throw err;
    console.log("=============源文件发生了更改！")
    status = states.toJson();
    console.log(states.toString());

    //文件的路径：即在webpack配置的路劲
    let bundJspath = path.join(
        config.output.path,
        config.output.filename
    );
    //一旦文件发生更改，即生成新的js文件，我们以同步的方式将他读取出来，
    let bundStr = mmfs.readFileSync(bundJspath, "UTF-8");//:string
    //这里返回一个字符串，如何将字符串转化为一个js模块？===》https://stackoverflow.com/questions/17581830/load-node-js-module-from-string-in-memory
    bund = str2JSModule(bundStr);//这里相当于 require()
});

module.exports = function (app) {
    app.use("/public", httpProxy({//将所有/pblic请求代理到webpack-dev-server的服务器下
        target: "http://localhost:3000"
    }));
    //被代理的请求不会再被get请求处理
    app.get("*", function (req, resp) {//客户端请求，我们需要返回一个html模板
        getHtmlTemplate().then(template => {
            //服务端渲染；
            let ssr = require("react-dom/server");
            const serverRenderHtml = ssr.renderToString(bund.default);
            resp.send(template.replace("<!--app-->", serverRenderHtml));
        }).catch(error => resp.send(error.toString()))
    });

}; 
