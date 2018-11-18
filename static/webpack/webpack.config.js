const path = require('path')
require('@babel/polyfill');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('bundle.min.css');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss'],    
    },

    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: extractCSS.extract([
                    'css-loader',
                    'sass-loader',
                    {loader: 'postcss-loader', 
                    options: {
                        config: {path: 'webpack/postcss.config.js'}
                    }}
                ]),
            }, {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        extractCSS
    ]
};
