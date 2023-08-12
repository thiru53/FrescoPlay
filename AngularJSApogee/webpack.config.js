const path = require('path');

module.exports = {
    entry: {
        app: './app/index.js',
    },
    devServer: {
        contentBase: "./",
        compress: true,
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' }
            }
        }
    }
};