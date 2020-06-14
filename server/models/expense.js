'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    userId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10,2),
    description: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  Expense.associate = function(models) {
    Expense.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'});
  };
  return Expense;
};