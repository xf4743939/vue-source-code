const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  // 将CSS提取为独立的文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  optimization: { //优化
    splitChunks:{
       chunk:"all",
       cacheGroup:{
         vendors:{
          test: /[\\/]node_modules[\\/]/,
          priority: -10
         },
         default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
       }  
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap:true,
        cache:false,
        parallel:true //使用多进程并行运行来提高构建速度
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    port:3000,
    progress:true,
    compress:true,
    contentBase: './dist',
  },
  externals:{
   jquery:'$'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HtmlWebpackPlugin({
      title: 'webpack 学习啊',
      template: './src/index.html',
      filename: 'index.html',
      minify:{ // 压缩html 文件
        removeAttributeQuotes: true,
        removeComments:true, // 移除Html中注释
        collapseWhitespace:true, //删除空白符
        minifyCSS:true, // 压缩内联css
        minifyJS: true
      },
      inject: true, // 所有javascript资源插入到body元素的底部
    }),
    // 注入全局
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //把css 插入head 的标签中
          },
          {
            loader: 'css-loader', // 负责@import 这种语法
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-runtime']],
          },
        },
      },
    ],
  },
}
