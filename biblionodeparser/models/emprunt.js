/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emprunt', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_membre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'membre',
        key: 'id'
      }
    },
    id_livre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'livre',
        key: 'id'
      }
    },
    date_start: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    date_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'emprunt',
    timestamps: false
  });
};
