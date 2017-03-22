const webpack = require('webpack');
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const app = express();
const compression = require('compression');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');


app.use(compression());

// We point to our static assets
app.use(express.static(publicPath, { maxAge: 86400000 }));

// We only want to run the workflow when not in production
if (!isProduction) {
  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  const bundle = require('./server/bundle.js');
  bundle();

  if (module.hot) module.hot.accept();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['gz'],
}));

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...');
});

// And run the server
const server = app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  const address = server.address();
  console.log('🌎  Listening at http://%s:%s', address.address, address.port);
  return 0;
});
