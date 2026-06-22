const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Area = sequelize.define(
  'Areas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    totalRooms: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalFloors: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  },
  { 
    tableName: 'Areas',
    paranoid: true
  },
);

module.exports = Area;
