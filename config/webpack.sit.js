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
    static: {
      directory: path.join(__dirname, "..", "dist"),
    },
    compress: true,
    port: 3001,
    open: true,
  },
});