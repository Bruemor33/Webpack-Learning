const webpack =  require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

let config = {

    // Set up webpack entry point, the specify output file
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'output.js'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json','.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'],
        alias: {
            images: path.resolve(__dirname, 'src/assets/images')
        }
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
            },
            // {
            //     test: /\.jsx$/,
            //     loader: "babel-loader",
            //     exclude: /node_modules/
            // },
            {
                test: /\.(jpg?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        },
                    },
                }],
                exclude: /node_modules/,
                include: __dirname,
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('style.css'), // Call the extract plugin and name our css file
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'), // A directory or URL to serve HTML content from.
        historyApiFallback: true, // fallback to /index.html for Single Page Applications.
        inline: true, // inline mode (set to false to disable including client scripts (like livereload)
        open: true, // open default browser while launching
        compress: true, // Enable gzip compression for everything served:
        hot: true // Enable webpack's Hot Module Replacement feature
      },
      devtool: 'eval-source-map', // enable devtool for better debugging experience
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(), // Call the uglify plugin
        new OptimizeCssAssets()
    );
}