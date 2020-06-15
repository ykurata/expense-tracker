'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    budget: DataTypes.DECIMAL(10,2)
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};