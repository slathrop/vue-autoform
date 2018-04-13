const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    entry: './example/main.js',
    output: {
        path: path.resolve(__dirname, './example/dist'),
        publicPath: './',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.vue/,
                use: {
                    loader: "vue-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: "vue-auto-form example",
            meta : {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            minify : false,
            template : "./example/index.html",
            chunksSortMode : 'none'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "example/dist"),
        compress: true,
        lazy: true,
        port: 8080,
        historyApiFallback: true,
        watchContentBase: true,
        clientLogLevel: "info",
        overlay: {
            warnings: true,
            errors: true
        },
        progress : true
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};