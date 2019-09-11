'use strict'

const webpack = require('webpack')

const { WebPlugin, AutoWebPlugin } = require('web-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack');

const utils = require('./utils')

module.exports = {
  entry: {
    main: './src/main.js',
    oidcRenew: './src/oidc-silent-renew.js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': utils.resolve('src'),
      'assets': utils.resolve('assets'),
      'pages': utils.resolve('src/pages'),
      'static': utils.resolve('static'),
      'components': utils.resolve('src/components')
    }
  },
  output: {
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        exclude: /(node_modules)/,
      }, {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /(node_modules)/
      }, {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: { compact : false }
          },
          'imports-loader?define=>false'
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }
    ]
  },

  plugins: [
    new Dotenv({
      systemvars: true
    }),
    new WebPlugin({
      filename: 'index.html',
      template: 'index.html',
      requires: ['main'],
    }),
    new WebPlugin({
      filename: 'oidc-silent-renew.html',
      template: 'oidc-silent-renew.html',
      requires: ['oidcRenew'],
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/@bimdata/utils/dist/fonts',
        to: 'dist/fonts'
      },
      {
        from: utils.resolve('static/img'),
        to: utils.resolve('dist/static/img'),
        toType: 'dir'
      },
    ])
  ]
}
