const webpack = require('webpack');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}