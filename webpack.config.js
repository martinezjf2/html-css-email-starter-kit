var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        firstComp: './src/js/index.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js/components'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendors',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { modules: false }],
                        '@babel/preset-react',
                    ],
                },
            },
        ],
    },
};
