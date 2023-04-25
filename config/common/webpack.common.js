const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = require('../../dotenv/env')
const webpack = require('webpack')

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "..", "..", "dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: process.env.NODE_ENV === "prod" ? "warning" : false,
    maxAssetSize: 50000, 
    maxEntrypointSize: 50000, 
  },
  stats: {
    children: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin(envKeys)
  ],
};
