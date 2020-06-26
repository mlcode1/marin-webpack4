const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({ // 引入js
      externals: [
        {
          module: 'react',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  devtool: 'source-map',
  // optimization:{  //提取公共js（方法2）
  //     splitChunks:{
  //         cacheGroups:{
  //             commons:{
  //                 test:/(react|react-dom)/,
  //                 name:'vendors',
  //                 chunks:'all'
  //             }
  //         }
  //     }
  // },
  optimization: { // 提取公共js（方法 3）
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2, // 被使用次数
        },
      },
    },
  },
};
module.exports = merge(baseConfig, prodConfig);
