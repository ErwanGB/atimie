var Sequelize = require(__dirname + "/lib/sequelize/index");
var sequelize = new Sequelize('mysql://postgres:postgres@localhost:5432/mlcb', {
  // Look to the next section for possible options
})

// Quick example
sequelize.query("SELECT * FROM user").success(function(users) {

  console.log(users)

})
