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
    Month.hasMany(models.Expense, {foreignKey: 'monthId'});
    Month.hasMany(models.Income, {foreignKey: 'monthId'});
  };
  return Month;
};