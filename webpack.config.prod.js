const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MniCss = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    target:'browserslist',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './prod'),
        filename: '[name].[hash:8].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new MiniCss({
            filename:"style.css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.(c|sc|sa|)ss$/i,
                use: [MiniCss.loader,'style-loader', "css-loader"],
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(jpeg|jpg|png|gif)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'images/[name]-[hash][ext]',
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'fonts/[name]-[hash][ext]',
                }
            }
        ]
    }
}