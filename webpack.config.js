'use strict'
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './dist/script.js'
  ],
  resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  optimization: {
    splitChunks: {
    },
  },
  plugins: [
    new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
          threshold: 10240,
          minRatio: 0.8
    }),
  ],
}
