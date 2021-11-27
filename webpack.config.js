const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "./src/index.js"),
    },

    output: {
        path: path.resolve(__dirname, "./deploy"),
        filename: "[name].bundle.js",
        clean: true,
        assetModuleFilename: "assets/images/[name][ext]"
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, "./src/index.html"),
            inject: "body",
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],
    
    module: {
        rules: [
            {
                test:/\.js$/,
                enforce: "pre",
                use: "source-map-loader"
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        sources: true,
                        minimize: true
                    }
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    devServer: {
        static: "./deploy",
        open: true
    }
}