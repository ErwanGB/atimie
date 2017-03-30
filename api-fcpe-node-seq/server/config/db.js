"use strict"
// Commande sequelize_auto pour générer les modèles. A lancer dans un terminal
//sequelize-auto -o "./server/models" -d fcpe -h localhost -u postgres -p 5432 -x postgres -e postgres

const Sequelize = require("sequelize");
const env = require("./env");
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.ets = require("../models/etablissement.js")(sequelize,Sequelize)
db.classe = require("../models/classe.js")(sequelize,Sequelize)

//Relations
db.ets.hasMany(db.classe)
db.classe.belongsTo(db.ets,{ foreignKey : 'etablissement_id'})


module.exports = db;