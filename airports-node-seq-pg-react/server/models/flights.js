/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('flights', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    from_airport: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    to_airport: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: true
    },
    arrival: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'flights',
    timestamps: false
  });
};
