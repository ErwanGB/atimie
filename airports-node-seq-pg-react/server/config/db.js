"use strict"

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
/*db.owners = require("../models/owners.js"")(sequelize, Sequelize);
db.pets = require("../models/pets.js"")(sequelize, Sequelize);*/
db.airports = require("../models/airports.js")(sequelize, Sequelize)
db.cities = require("../models/cities.js")(sequelize, Sequelize)
db.flights = require("../models/flights.js")(sequelize, Sequelize)
db.transits = require("../models/transits.js")(sequelize, Sequelize)

//Relations
db.cities.hasMany(db.airports)
db.airports.belongsTo(db.cities)

db.flights.belongsTo(db.airports,{as : "fromApt",foreignKey : "from_airport"})
db.flights.belongsTo(db.airports,{as : "toApt",foreignKey : "to_airport"})

db.airports.hasMany(db.flights,{ foreignKey: 'from_airport' })
db.airports.hasMany(db.flights,{ foreignKey: 'to_airport' })


module.exports = db;