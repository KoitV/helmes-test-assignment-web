const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: "js/[name].[contenthash].js",
        publicPath: "/",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/
            },
            {
                test: /\.m?js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        ["@babel/preset-env", { targets: "defaults"}]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    "vue-style-loader",
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: "body",
            template: "./src/index.html",
            filename: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
        new Dotenv({
            path: process.env.NODE_ENV === "production" ? "./.env.production" : "./.env"
        })
    ],
    resolve: {
        extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        port: 8002
    }
}