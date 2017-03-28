/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transits', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    airport_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'airports',
        key: 'id'
      }
    },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'flights',
        key: 'id'
      }
    }
  }, {
    tableName: 'transits',
    timestamps: false
  });
};
