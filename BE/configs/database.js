const { Sequelize} = require('sequelize');


const connection = new Sequelize('quanliphongtro', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 10,      // tối đa 10 connections
    min: 0,       // tối thiểu 0 connections
    acquire: 30000, // thời gian chờ lấy connection (ms)
    idle: 10000,    // thời gian connection rảnh trước khi đóng (ms)
  },
});



module.exports = connection;