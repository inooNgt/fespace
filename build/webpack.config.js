const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// 多线程
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const host = "http://localhost:9000";
const isDev = process.env.NODE_ENV === "development";

console.log("isDev:", isDev);

const config = {
    entry: {
        main: ["babel-polyfill", path.resolve(__dirname, "../static/main.js")]
    },
    output: {
        publicPath: "/dist/", //虚拟目录，自动指向path编译目录('./public/dist')
        path: path.resolve(__dirname, "../public/dist"),
        chunkFilename: isDev ? "js/[name].js" : "js/[name]-[hash:6].js",
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader"]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "sass-loader"]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: "happypack/loader?id=js"
            }
        ]
    },
    plugins: [
        //js 编译多线程
        new HappyPack({
            id: "js",
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react", "stage-0"],
                        plugins: []
                    }
                }
            ]
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, "../public/dist")),
        new HtmlwebpackPlugin({
            title: "test",
            template: path.resolve(__dirname, "../static/template/index.html"),
            filename: "../index.html", //相对于webpackConfig.output.path
            hash: true
        }),
        new ExtractTextPlugin("css/[name].css")
    ],
    resolve: {
        alias: {},
        extensions: ["*", ".js", ".json", ".scss"]
    }
};

if (isDev) config.devtool = "eval-source-map";

module.exports = config;
