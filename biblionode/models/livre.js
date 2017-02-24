/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('livre', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'livre',
    timestamps: false
  });
};
