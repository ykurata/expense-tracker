'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    userId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  Income.associate = function(models) {
    Income.belongsTo(models.Month, {
      onDelete: "CASCADE",
      foreignKey: 'monthId' 
    });
  };
  return Income;
};