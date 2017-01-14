var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// ElasticSearch
var cors = require('cors');
var SearchkitExpress = require("searchkit-express");
var elasticHost = "http://localhost:9200";

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

var server = app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  var host = server.address().address;
  var port = server.address().port;
  console.log('🌎  Listening at http://%s:%s', host, port);
});
