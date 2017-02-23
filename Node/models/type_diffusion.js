/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type_diffusion', {
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelle: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'type_diffusion'
  });
};
