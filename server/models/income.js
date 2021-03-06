'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    userId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    description: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  Income.associate = function(models) {
    Income.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'});
  };
  return Income;
};