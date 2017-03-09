const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.join(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './index.js',
  ],
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  stats: { colors: true },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production'),
    //   },
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false, // remove comments
    //   compress: {
    //     unused: true,
    //     dead_code: true, // big one--strip code that will never execute
    //     warnings: false, // good for prod apps so users can't peek behind curtain
    //     drop_debugger: true,
    //     conditionals: true,
    //     evaluate: true,
    //     drop_console: true, // strips console statements
    //     sequences: true,
    //     booleans: true,
    //   },
    // }),
    // new ExtractTextPlugin('styles.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        // loaders: [ExtractTextPlugin.extract('style-loader'), 'css-loader'],
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        // loaders: [ExtractTextPlugin.extract('style-loader'), 'css-loader', 'sass-loader'],
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=10000&mimetype=image/gif',
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]',
      },
      {
        test: /\.csv$/,
        loader: 'dsv-loader',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  target: 'web',
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      '@styles': path.resolve(__dirname, './styles'),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      'react': path.resolve('./node_modules/react'),
    },
  },
};
module.exports = config;
