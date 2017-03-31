const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'src', 'index.js');

const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {

  context: path.join(__dirname, 'src'),
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    mainPath,
  ],
  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        loader: 'url-loader?limit=1&mimetype=image/[name]',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        loader: 'url-loader?limit=1&name=[name].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.json|\.css$|\.html|\.png$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './styles'),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      react: path.resolve('./node_modules/react'),
    },
  },
};

module.exports = config;
