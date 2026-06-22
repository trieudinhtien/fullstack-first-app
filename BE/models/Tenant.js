const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Tenant = sequelize.define(
  'Tenant',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },


    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    identityNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    checkInDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    checkOutDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    roomId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'Tenants',
    paranoid: true,
  }
);

module.exports = Tenant;