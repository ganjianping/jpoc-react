const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./common/webpack.release.js");
const Dotenv = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = merge(common, {
  plugins: [
    new Dotenv({
      path: path.join(__dirname, "..", "dotenv", ".env.sit"),
    }),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    proxy: {
      '/spring/web': {
        target: 'https://jpoc-api.ganjianping.com',
        changeOrigin: true,
        secure: false
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