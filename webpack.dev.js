// webpack.dev.js


// webpack.dev.js

import path from "path";
import webpack from "webpack";
import devConfig from "./configs/config.dev.json";

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Add more rules for handling CSS, images, and other assets
      // ...
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // Add any other specific resolutions or aliases
    // ...
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(devConfig),
    }),
  ],
  
};