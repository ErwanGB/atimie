/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('realisateur', {
    realisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_realisateur: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    }
  }, {
    tableName: 'realisateur'
  });
};
