/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('programmation', {
    programmation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chaine_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programme_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_diffusion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    heure: {
      type: DataTypes.CHAR,
      allowNull: false
    }
  }, {
    tableName: 'programmation'
  });
};
