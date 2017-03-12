'use strict';
var express = require('express');
var app = express();




app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});
/*
app.get('/article/:article', function(req, res) {
    var noms = ["james","lars","kirk","robert"]
    res.render('article.ejs', {article: req.params.article, noms});
});
*/
var request = require('request');

var url = 'http://datastore.opendatasoft.com/public/api/datasets/1.0/search';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is already parsed as JSON:
      console.log("data : " + data);
    }
});

app.listen(8888);