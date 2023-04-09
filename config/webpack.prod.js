const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./common/webpack.release.js");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  plugins: [
    new Dotenv({
      path: path.join(__dirname, "..", "dotenv", ".env.prod"),
    })
  ],
});