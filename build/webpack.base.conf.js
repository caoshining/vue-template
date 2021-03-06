'use strict'
const path = require('path')
const px2rem = require('postcss-plugin-px2rem')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const vuxLoader = require('vux-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

let webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
      // 'assets': resolve('src/assets')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style',
    // new webpack.LoaderOptionsPlugin({
    //   test: /\.css$/,
    //   loader: 'style-loader!css-loader!postcss-loader',
    //   options: {
    //     postcss: function () {
    //       return [px2rem({ remUnit: 75 })]
    //     }
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      // webpack 2.0之后， 此配置不能直接写在自定义配置项中， 必须写在此处
      vue: {
        postcss: [require('postcss-plugin-px2rem')({ rootValue: 75, propWhiteList: [] })]
      }
    }),
    {
      name: 'after-less-parser',
      fn: function (source) {
        if (this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1) {
          source = source.replace(/px/g, 'PX')
        }
        // 自定义的全局样式大部分不需要转换~
        if (this.resourcePath.replace(/\\/g, '/').indexOf('App.vue') > -1) {
          source = source.replace(/px/g, 'PX').replace(/-1PX/g, '-1px')
        }
        return source
      }
    },
    {
      name: 'style-parser',
      fn: function (source) {
        if (this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1) {
          source = source.replace(/px/g, 'PX')
        }
        // 避免转换1PX.less文件路径
        if (source.indexOf('1PX.less') > -1) {
          source = source.replace(/1PX.less/g, '1px.less')
        }
        return source
      }
    }
  ]
})