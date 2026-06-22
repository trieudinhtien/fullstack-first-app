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

    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        'available',
        'occupied',
        'maintenance'
      ),
      defaultValue: 'available',
    },

    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Rooms',
    paranoid: true,
  }
);

module.exports = Room;