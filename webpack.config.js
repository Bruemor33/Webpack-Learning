const webpack =  require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

let config = {

    // Set up webpack entry point, the specify output file
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'output.js'
    },

    // Specify a loader and a set of rules
    module: {
        rules: [
            {
                test: /\.js$/, // Files ending with .js
                exclude: /node_modules/, // Exclude Node_Modules folder
                loader: "babel-loader" // use this (core babel) loader
            },
            {
                test: /\.scss$/, // Files ending with .scss
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader' // Fallback for non extracted css
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('style.css'), // Call the extract plugin and name our css file
        new webpack.optimize.UglifyJsPlugin() // Call the uglify plugin
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './public'), // A directory or Url to serve HTML content from
        historyApiFallback: true, // Fallback to intex.html for single page content
        inline: true, // Inline Mode (set to false to disable including client scripts like livereload)
        open: true // open default browser while launchin
    },
    devtool: 'eval-source-map' // enable devtool for better debugging experience
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(), // Call the uglify plugin
        new OptimizeCssAssets()
    );
}