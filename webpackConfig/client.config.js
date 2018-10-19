const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const ROOT_PATH = path.join(__dirname, "../");
const CLIENT_PATH = path.join(ROOT_PATH, "/client");
const BUILD_PATH = path.join(ROOT_PATH, "/build");

const isDev = process.env.NODE_ENV === "development";//NODE_ENV实在npm 启动时设置的一个变量，在windows下获取到这个变量需要安装cross-evn包
let config = {
    mode: "development",
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(CLIENT_PATH, '/index.html'),
            minify:true,
            favicon:path.join(CLIENT_PATH,'favicon.ico')
        }),
        new cleanWebpackPlugin(["build"], {
            root: ROOT_PATH//指定webpack的根目录
        }),

    ]
}
if (isDev) {//开发环境
    config.devtool = "cheap-module-source-map";
    config.devServer = {
        host: "0.0.0.0",
        port: "3000",
        //启动热加载，无刷新
        hot: true,//如果加上这个需要安装热价在插件。没有这个也可以实现更改代码，更新浏览器界面（会发生浏览器刷新）
        // contentBase: BUILD_PATH,//服务器加载页面所在的目录，index.html所在目录
        overlay: {
            warnings: true,
            errors: true
        },
        publicPath: "/public",//在webpack-dev-Server服务器下访问资源，都要通过/public/***.*,加上这个是为了和原始webpack相匹配
        historyApiFallback: {//这是实际是将请求转发了，
            //由于配置了pblicPath，要方位locahost：port//index.html,需要访问localhost：port//public/index.html,
            //这里可以进行转发，配置为：
            //所有404也会转发到这里
            index: "/public/index.html",
        },
        proxy:{
            "/api":"http://localhost:3333"
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin());//react-hot-loader需要依赖于它
}
module.exports = webpackMerge(baseConfig, config);
