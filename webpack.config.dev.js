const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils' : path.resolve(__dirname,'src/utils/'),
            '@templates' : path.resolve(__dirname,'src/templates/'),
            '@styles' : path.resolve(__dirname,'src/styles/'),
            '@images' : path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module: {
        rules: [
            //Html
            {
                test: /\.m?js$/,
                exclude: /node_module/,
                use:{
                    loader: 'babel-loader'
                }
            },
            //Css
            {
                test: /\.css$/i,
                use:[MiniCssExtractPlugin.loader, 
                'css-loader'],
            },
            //Copy
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/i,  // Tipos de fuentes a incluir
                type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
                generator: {
                filename: 'static/fonts/[hash][ext][query]',  // Directorio de salida
                },
            }        
        ]
    },
    plugins: [
        //Html
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        //Css
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        //Copy
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        //Enviroment
        new Dotenv(),
    ],
}