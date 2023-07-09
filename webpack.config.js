const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    target:'web',
    devtool:'source-map',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash:8].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', "css-loader"],
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(jpeg|jpg|png|gif)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'images/[name]-[contenthash][ext]',
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'fonts/[name]-[contenthash][ext]',
                }
            }
        ]
    },
    devServer: {
        compress: false,
        open: true,
        port: 3000,
        hot: true,
    }
}