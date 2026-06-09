const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const { QueryTypes } = require('sequelize');
const sequelize = require('./configs/database');

const router = require('./routes/api');

require("./models");



const start  = async() => {
  app.use(cors({origin: "http://localhost:3000"}));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //init table
  await sequelize.sync({ alter: true });

  //init router
  app.use('/', router);



  //start port 8080
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}


start();



