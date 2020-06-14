'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    userId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    monthId: DataTypes.INTEGER
  }, {});
  Income.associate = function(models) {
    // associations can be defined here
  };
  return Income;
};