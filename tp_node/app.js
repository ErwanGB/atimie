var express = require('express');
var bodyParser = require ('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.listen(8888);

var mongodb = require('mongodb').MongoClient;
var db;

// GET /hello-world : affiche le message "Hello World" , en utilisant res.send
app.get('/hello-world', function(req, res) {
        res.send('hello world\n') ;
});  

// GET /coucou/:name : affiche le message "Coucou [name]" , utilisant un template HTML
app.get('/coucou/:name', function(req, res) {
        var name = req.params.name
        res.render('coucou',{name}) ;
});  

mongodb.connect("mongodb://localhost:27017/tp", function(err,db){
    if(err){console.log("Erreur : "  + err)};

// GET /ping?message=text : insert un document dans la collection ping (date et message) et répond "OK"
    app.get('/ping', function(req, res) {
        var message = req.query.message
        if (message){            
            var date = new Date();
            db.collection('ping').insert({date:date,message:message}).then(function(err){
                if(err){console.log("GET /ping : " + err)};
                console.log("OK");
                res.send('OK');
            })
        }else{
            res.send('Message non renseigné')
        }
    });

// POST /message : insert un document dans la collection message (auteur, message) et répond "OK"
    app.post('/message', function(req, res) {
        var auteur = req.body.auteur;
        var message = req.body.message;
        if (auteur && message){
            db.collection('message').insert({auteur:auteur,message:message}).then(function(err){
                if(err){console.log("POST /message : " + err)};
                console.log("OK");
                res.send('OK');            
            })
        }else if(!auteur && !message){
            res.send("Auteur et message non renseignés")
        }else if(!auteur){
            res.send("Auteur non renseigné")
        }else if(!message){
            res.send("Message non renseigné")
        }
    });

// GET /messages : affiche la liste des messages
    app.get('/messages', function(req, res) {
        db.collection('message').find().toArray(function(err,data){
            if(err){console.log("GET /messages : " + err)};
            if(data.length > 0){
                res.send(data) 
            }else{
                res.send("Pas de messages")
            }
        })
    });

// GET /messages/:auteur : affiche la liste des messages correspondant à l'auteur
    app.get('/messages/:auteur', function(req, res) {
        var auteur = req.params.auteur
        db.collection('message').find({'auteur':auteur}).toArray(function(err,data){
            if(err){console.log("GET /messages/:auteur : " + err)};
            if(data.length > 0){
                res.send(data) 
            }else{
                res.send("Pas de messages avec cet auteur")
            }
        })
    });

});







