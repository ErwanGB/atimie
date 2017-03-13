/*
/hotels (nom / nombre d'étoiles)
/hotel/:id (données complètes)
/ville/:codePostal/hotels (données complètes)

/hotels/:codePostal/:distance
/hotels/:codePostal/statistiques/moyenne
/hotels/:codePostal/statistiques/capacite
*/
var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
var mongodb = require('mongodb').MongoClient;
var db;
app.listen(8888);
var hotels;


mongodb.connect("mongodb://localhost:27017/hotels", function(err,db){
    if(err){console.log("Erreur : "  + err)};
    var collection = db.collection('hotels');
    var comments = db.collection('comments');

    app.get('/', function(req, res) {
            res.render('index');  
    });    
     
    app.get('/hotels', function(req, res) {
        collection.find().toArray(function(err, data) {
            //res.render('hotelsmongo', {data}); 
            res.json(data);
        })
    });

    app.get('/hotel/:id', function(req, res) {
        collection.find({'recordid':req.params.id}).toArray(function(err, data) {
            data = data[0];
            //res.render('fichehotel', {data});
            res.json(data);
        })
    });

    app.get('/ville/:codepostal/hotels',function(req,res){
        collection.find({"fields.code_postal":parseInt(req.params.codepostal)}).toArray(function(err, data) {
            res.render('hotelsmongo', {data});
        })
    });

    app.get('/hotels/:codepostal/statistiques/capacite',function(req,res){
        collection.aggregate(
            [{ $match: { 'fields.code_postal': parseInt(req.params.codepostal) } },
                {$group:{
                        _id:'$fields.code_postal',
                        total:{
                                $sum:'$fields.capacite_d_accueil_personnes'
                            }
                        }
            }]).toArray(function(err, data) {
            data = data[0];
            res.render('statistiques', {data});           
            //res.json(data);
        })
    });

    app.get('/hotels/:codepostal/statistiques/moyenne', function (req, res) {
        collection.aggregate(
            [{ $match: { 'fields.code_postal': parseInt(req.params.codepostal) } },
            {
                $group: {
                    _id: '$fields.code_postal',
                    total: {
                        $avg: '$fields.note'
                    }
                }
            }]).toArray(function (err, data) {
                data = data[0];
                res.render('statistiques', {data});           
            })
    });

    app.get('/hotel/:id/comment',function(req,res){
        res.render('comment');
    });

    app.get('/hotel/:id/comments',function(req,res){
        comments.find({'hotelid':req.params.id}).toArray(function(err,data){
            res.render('comments', {data});
        })
    });

    app.post('/hotel/:id/comment',function(req,res){
        var id = req.params.id;
        var auteur = req.body.auteur;
        var contenu = req.body.contenu;
        var date = new Date();        
        comments.insert({hotelid:id,auteur:auteur,contenu:contenu,date:date}).then(function(err){
            if(err){console.log(err)};
            res.redirect('comments');
        })
    });


});







