/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('airports', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'airports',
    timestamps: false,
    underscored: true
  });
};
