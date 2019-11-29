"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigSql_1 = require("../ConfigSql");
const Sequelize = require('sequelize');
exports.Product = ConfigSql_1.sequelize.define('product', {
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
    }
}, {
    timestamps: false
    // options
});
exports.Order = ConfigSql_1.sequelize.define('order', {
    // attributes
    order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true
    // options
});
