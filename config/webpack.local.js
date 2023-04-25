const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./common/webpack.debug.js");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  plugins: [
    new Dotenv({
      path: path.join(__dirname, "..", "dotenv", ".env.dev"),
    })
  ],
  devServer: {
    proxy: {
      '/spring/web': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/v1': '/v1' },
      },
    },
    static: {
      directory: path.join(__dirname, "..", "dist"),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
});
