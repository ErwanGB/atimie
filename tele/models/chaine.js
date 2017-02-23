/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Chaine = sequelize.define('chaine', {
    chaine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_chaine: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NULL"
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code_postal: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    payante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fax: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: "NULL"
    }
  }, {
    tableName: 'chaine',
    timestamps : false,
  });
  return Chaine;
};
