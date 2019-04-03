const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js',
        appindex: './src/app-index.js',
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
    },
    devtool: devMode ? "source-map" : "",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new CopyPlugin([
            {from: './src/img', to: './img'},
        ]),
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html',
            chunks: ['appindex']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/catalog.html',
            filename: 'catalog.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/card-product.html',
            filename: 'card-product.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/card-product-quick-view.html',
            filename: 'card-product-quick-view.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/contacts.html',
            filename: 'contacts.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/vacancy-page.html',
            filename: 'vacancy-page.html',
            chunks: ['app']
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {loader: 'postcss-loader', options: {ident: 'postcss', plugins: [require('autoprefixer')()]}},
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'src',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
};

