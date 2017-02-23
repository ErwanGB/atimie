var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5432/tele', {
   dialect: 'postgres'
})

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

app.get('/article/:article', function(req, res) {
    var noms = ["james","lars","kirk","robert"]
    res.render('article.ejs', {article: req.params.article, noms});
});

app.get('/tele/all', function(req, res) {
    var Chaine = sequelize.import(__dirname + "/models/chaine.js");
    Chaine.findAll().then(function(chaine) {
        res.render('tele',{chaine});
    });
});

app.get('/cv', function(req, res) {
    var star = [
                {name:"HTML5",value:4},{name:"CSS3 SASS",value:5},{name:"Javascript",value:3},
                {name:"RWD",value:3},{name:"jQuery",value:3},{name:"Nodejs",value:3},
                {name:"Bootstrap",value:5},{name:"PostgresSQL",value:4},{name:"MySQL",value:3},
                {name:"UML",value:3},{name:"Anglais technique",value:4},{name:"Android",value:2}
                ];
    res.render('cv.ejs', {star})
});

app.listen(8888);