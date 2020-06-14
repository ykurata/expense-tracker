'use strict';
module.exports = (sequelize, DataTypes) => {
  const Month = sequelize.define('Month', {
    userId: DataTypes.INTEGER,
    month: DataTypes.STRING,
    budget: DataTypes.STRING,
    expense: DataTypes.STRING,
    income: DataTypes.STRING
  }, {});
  Month.associate = function(models) {
    // associations can be defined here
  };
  return Month;
};