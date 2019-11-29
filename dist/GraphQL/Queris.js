"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//resolvers
const Order_1 = require("./../models/Order");
const Product_1 = require("./../models/Product");
exports.root = {
    products: () => {
        let pureData = [];
        let data = Product_1.Product.findAll().then((result) => {
            for (let i = 0; i < result.length; i++) {
                pureData.push(result[i].dataValues);
            }
            return (pureData);
        });
        return (data);
    },
    createOrder: ({ order_quantity, producto_id }) => {
        let create = Order_1.Order.create({ order_quantity: order_quantity, producto_id: producto_id }).then((order) => {
            return (order);
        });
        return (create);
    }
};
