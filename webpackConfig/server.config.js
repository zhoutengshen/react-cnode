const path = require("path");
const webpack = require("webpack");
const ROOT_PATH = path.join(__dirname, "../");
const CLIENT_PATH = path.join(ROOT_PATH, "/client");
const BUILD_PATH = path.join(ROOT_PATH, "/build");
//服务端渲染
let config = {  
    target: "node",//"表明webpack打包后的文件的运行环境为node"
    mode: 'development',
    entry: {
        app: path.join(CLIENT_PATH, "/server.entry.js")
    },
    output: {
        path: BUILD_PATH,
        filename: "server.entry.js",
        libraryTarget: "commonjs2",//打包后的js所用的js规范,
        publicPath: "/public/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'] //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
    }
}
module.exports = config;