const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

export const sequelize = new Sequelize(process.env.Database, process.env.Username, process.env.Password, {
  host: process.env.Host,
  dialect: 'mysql',
  logging: console.log,
  timezone: '-05:00',
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true
  }
});