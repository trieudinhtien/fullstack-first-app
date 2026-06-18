const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Room = sequelize.define(
  'Room',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
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
    // Other model options go here
  },
);

module.exports = Room;
