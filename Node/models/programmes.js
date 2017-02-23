/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Programmes = sequelize.define('Programmes', {
    programme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    realisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duree: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nom_programme: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'programmes',
  },{
    classMethods: {
      associate: function(models) {
        Programmes.belongsTo(models.Chaine);
      }
    }
  }
  );
  return Programmes;
};
