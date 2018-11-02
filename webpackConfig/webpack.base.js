const path = require("path");
const ROOT_PATH = path.join(__dirname, "../");
const CLIENT_PATH = path.join(ROOT_PATH, "/client");
const BUILD_PATH = path.join(ROOT_PATH, "/build");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

let port = process.env.port;
let nodeEnv = process.env.NODE_ENV || "development";
module.exports = {
    mode: nodeEnv,
    entry: {
        app: path.join(CLIENT_PATH, "/app.js")
    },
    output: {
        path: BUILD_PATH,
        filename: "[name].[hash].bundle.js",
        publicPath: "/public/",//打包后的js的访问路径为：/public/**.js
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /.(js|jsx)$/,
                loader: "eslint-loader",
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                options: {
                    fix: true
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}
                  }
                ]
              }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({ url: `http://localhost:${port || 3000}` })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'] //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
    }
}
