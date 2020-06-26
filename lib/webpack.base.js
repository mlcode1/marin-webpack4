const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/js/*.js'));

  Object.keys(entryFiles).map((item) => {
    const entryFile = entryFiles[item];
    const match = entryFile.match(/src\/js\/(.*)\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    if (pageName.indexOf('server') === -1) {
      return htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(projectRoot, `src/page/${pageName}.html`),
          filename: `page/${pageName}.html`,
          chunks: [pageName],
          minify:{
            removeComments:false
          }
        }),
      )
    }
    return 1;
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(projectRoot, './dist/'),
    publicPath: '../',
    // filename: 'js/[name]_[hash:8].js',
    filename: 'js/[name].js'
  },
  // 关闭 webpack 的性能提示
  performance: {
    hints: false,
  },
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: 'css/[name]_[contenthash:8].css',
        // filename:"css/[name].css"
      },
    ),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      $: 'jquery',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        // use: ExtractTextPlugin.extract({
        //     use: ['css-loader'],
        //     fallback: 'vue-style-loader'
        // })
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                AutoPrefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          // ,{
          //     loader:"px2rem-loader",
          //     options:{
          //         remUnit:75,
          //         remPrecision:8
          //     }
          // }
        ],
      },
      {
        test: /\.(scss|sass)$/,
        // use: ExtractTextPlugin.extract({
        //     use: ['css-loader', 'sass-loader'],
        //     fallback: 'vue-style-loader'
        // })
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                AutoPrefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              'vue-style-loader',
              'css-loader',
              'sass-loader',
            ],
            sass: [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        // use:[
        //     {
        //         loader:'url-loader',
        //         options:{
        //             esModule:false,
        //             name:"[name].[ext]?[hash]",
        //             limit:10240
        //         }
        //     }
        // ],//上下两种方法都可
        use: [
          {
            loader: 'file-loader',
            options: {
              // esModule: false,
              // context:"dist",
              name: 'images/[name]_[hash:8].[ext]',
              // publicPath:"../",
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: '/dist/page/index.html',
      // 与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
    stats: 'errors-only',
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      jquery: 'jquery',
      'jquery-ui': 'jquery-ui',

    },
  },

};
