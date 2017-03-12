var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var datajs = require('./data/menus_cantine.json');

app.get('/menus', function(req, res) {
    datajs = datajs.data
    //console.log(datajs);
    res.render('menus', {datajs});
});


app.listen(8888);