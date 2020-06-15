'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Expense, {foreignKey: 'userId', onDelete: 'cascade'});
    User.hasMany(models.Income, {foreignKey: 'userId', onDelete: 'cascade'});
    User.hasMany(models.Category, {foreignKey: 'userId', onDelete: 'cascade'});
  };
  return User;
};