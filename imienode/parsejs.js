/*
/hotels (nom / nombre d'étoiles)
/hotel/:id (données complètes)
/ville/:codePostal/hotels (données complètes)

/hotels/:codePostal/:distance
/hotels/:codePostal/statistiques/moyenne
/hotels/:codePostal/statistiques/capacite
*/
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var data = require('./les_hotels_classes_en_ile-de-france.json');
var capacite = 0;
var sum = 0;
var moy = 0;
var hotels;

app.get('/hotels', function(req, res) {
    var hotels = data; 
    capacite = 0;
    sum = 0;
    moy = 0;
    for (var item of data){
        capacite += parseInt(item.fields.capacite_d_accueil_personnes);
        sum += parseInt((item.fields.classement).substr(0,1));
    }
    moy = sum / data.length;
    console.log(capacite);
    res.render('hotels', {hotels,capacite,moy});
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
    capacite = 0;
    sum = 0;
    moy = 0;
    
    for (var item of data){
        if(item.fields.code_postal == req.params.codepostal){
            capacite += parseInt(item.fields.capacite_d_accueil_personnes);
            hotels.push(item);
            sum += parseInt((item.fields.classement).substr(0,1));
        };
    };
    moy = sum / data.length;
    res.render('hotels',{hotels,capacite,moy})
});


app.listen(8889);
