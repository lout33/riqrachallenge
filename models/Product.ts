import { sequelize } from '../ConfigSql'
const Sequelize = require('sequelize');


export const Product = sequelize.define('product', {
  // attributes
  prod_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  prod_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prod_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // en soles
  }
}, {
  timestamps: false
  // options
});