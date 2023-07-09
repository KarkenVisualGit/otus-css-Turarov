const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    target:'browserslist',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './prod'),
        filename: '[name].[contenthash:8].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new MiniCss({
            filename:"style.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(c|sc|sa|)ss$/i,
                use: [MiniCss.loader, "css-loader"],
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                type: 'asset/resource',
                generator:  {
                    filename: 'images/[name]-[contenthash][ext]',
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'fonts/[name]-[contenthash][ext]',
                }
            },
        ],
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.sharpMinify,
              options: {
                encodeOptions: {
                  jpeg: {
                    quality: 100,
                  },
                  webp: {
                    lossless: true,
                  },
                  avif: {
                    lossless: true,
                  },
                  png: {},
                  gif: {},
                },
              },
            },
          }),
        ],
      },
      
}