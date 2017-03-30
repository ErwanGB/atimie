/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom_professeur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    niveau: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    indice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    etablissement_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'etablissement',
        key: 'id'
      }
    }
  }, {
    tableName: 'classe'
  });
};
