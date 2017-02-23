var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5432/tele', {
   dialect: 'postgres'
})

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var Chaine = sequelize.import(__dirname + "/models/chaine.js")

Chaine.findAll().then(function(chaine) {
  for (var item of chaine){
    console.log(item.nom_chaine)
  }
})

