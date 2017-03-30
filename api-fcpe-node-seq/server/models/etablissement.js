/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etablissement', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'etablissement',
    underscore: true,
    timestamps: false
  });
};
