var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var data = require('./les_hotels_classes_en_ile-de-france.json');

app.get('/hotel', function(req, res) {
    res.render('hotel', {data});
});

app.get('/hotel/:id', function(req, res) {
    var hotel = '';
    for (var item of data){
        if (item.recordid == req.params.id){
            hotel = item
        }
    } 
    res.render('fichehotel', {hotel});
});

app.get('/ville/:codepostal/hotels',function(req,res){
    var hotels = [];
    var capacite = 0;
    for (var item of data){
        if(item.fields.code_postal == req.params.codepostal){
            capacite += item.fields.capacite_d_accueil_personnes;
            hotels.push(item);
        };
    };
    res.render('hotels',{hotels,capacite})
});


app.listen(8888);
