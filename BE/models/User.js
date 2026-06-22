const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true, // not is default true ,
    },
  },
  {
    paranoid: true
  },
);

module.exports = User;
