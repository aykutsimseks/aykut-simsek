const path = require('path');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// ElasticSearch
const cors = require('cors');
const SearchkitExpress = require('searchkit-express');

const elasticHost = 'http://localhost:9200';

app.use('/api', cors({
  origin: '*',
  maxAge: 20 * 24 * 60 * 60, //20 days like elastic
}));
app.use('/api/movies', SearchkitExpress.createRouter({
  host: elasticHost, index: 'movies',
}));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }

  const host = server.address().address;
  const port = server.address().port;
  console.log('🌎  Listening at http://%s:%s', host, port);
  return 0;
});
