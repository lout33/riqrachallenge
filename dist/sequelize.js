"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
function sequelize() {
    const sequelize = new Sequelize(process.env.Database, process.env.Username, process.env.Password, {
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
    sequelize
        .sync({ force: false })
        .then(() => {
        console.log('BD creada con éxito');
    })
        .catch((error) => {
        console.log('error al crear la BD');
        console.log(error);
    });
}
exports.sequelize = sequelize;
