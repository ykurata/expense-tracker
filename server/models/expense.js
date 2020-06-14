'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    userId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  Expense.associate = function(models) {
    Expense.belongsTo(models.Month, {
      onDelete: "CASCADE",
      foreignKey: 'monthId' 
    });
  };
  return Expense;
};