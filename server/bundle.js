const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack/webpack.config.js');

module.exports = () => {
  // First we fire up Webpack an pass in the configuration we
  // created
  var bundleStart = null;
  const compiler = Webpack(webpackConfig);

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  compiler.plugin('done', () => {
    console.log(`Bundled in ${(Date.now() - bundleStart) / 1000}s!`);
  });

  const bundler = new WebpackDevServer(compiler, {
    compress: true,
    progress: true,

    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/build/',

    historyApiFallback: true,

    // Configure hot replacement
    hot: true,
    inline: true,

    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(8080, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
};
