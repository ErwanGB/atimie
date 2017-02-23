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

var Chaine = sequelize.define('chaine', {
  id : {
    type: Sequelize.INTEGER,
    field: 'chaine_id',
    primaryKey : true,
  },
  nom_chaine : {
    type: Sequelize.STRING,
  },
  adresse : {
    type: Sequelize.STRING,
  },
  code_postal : {
    type: Sequelize.STRING,
  },
  ville : {
    type: Sequelize.STRING,
  },
  telephone : {
    type: Sequelize.STRING,
  },
  payante : {
    type: Sequelize.INTEGER,
  },
  },
  {
  freezeTableName: true,
  timestamps : false,
  }
);

Chaine.findAll().then(function(chaine) {
  console.log(chaine)
})

/*
Chaine.findOne({where:{id : 2}}).then(function(chaine){
  console.log(chaine.adresse);
})
*/
/*
  chaine_id integer NOT NULL,
  nom_chaine character varying(20) DEFAULT NULL::character varying,
  adresse character varying(20) NOT NULL,
  code_postal character(5) NOT NULL,
  ville character varying(30) NOT NULL,
  telephone character(14) NOT NULL,
  payante integer NOT NULL,
  fax character(14) DEFAULT NULL::bpchar,
  CONSTRAINT chaine_pkey PRIMARY KEY (chaine_id)*/