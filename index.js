// import express from 'express';
const express = require('express')
const app = express()
const Sequelize = require('sequelize');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');
var schema = buildSchema(`
  type Query {
    products: [Product!]!
  }
  type Mutation{
    createOrder(order_quantity:Int!,producto_id:Int!):Order
  }
  type Product {
  prod_id: Int!
  prod_name: String!
  prod_price: String!
}

type Order {
  order_id:Int!
  order_quantity: Int!
  producto_id: Int!
}
`);


var root = {
  products: () => {
    let pureData = []
    let data = Product.findAll().then((result) => {
      for (let i = 0; i < result.length; i++) {
        pureData.push(result[i].dataValues);
      }
      return (pureData)
    })
    return (
      data
    )
  },
  createOrder: ({ order_quantity, producto_id }) => {
    let create = Order.create({ order_quantity: order_quantity, producto_id: producto_id }).then(order => {
      console.log("Jane's auto-generated ID:" + order);
      return (order)
    })
    return (create)
  }
};

app.get('/', function (req, res) {
  res.send('Hello World')
})

const sequelize = new Sequelize('riqra-schema', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
  timezone: '-05:00',
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true
  }
});


const Product = sequelize.define('product', {
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

const Order = sequelize.define('order', {
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
    // en soles
  },
  producto_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true
  // options
});

//creara un array de ordenes;
// Product.create({ prod_name: "Queso", prod_price: 10 }).then(product => {
//   console.log("Jane's auto-generated ID:");
// });
// Product.findAll().then((result) => {
//   for (let i = 0; i < result.length; i++) {
//     console.log(result[i].dataValues);
//   }
// })


sequelize
  .sync({ force: false })
  .then(() => {
    console.log('BD creada con éxito');
  })
  .catch((error) => {
    console.log('error al crear la BD');
    console.log(error);
  });

///cors
app.use(cors())
app.use(express.json());


// app.listen(8000)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
let puerto = process.env.PORT || 8000;
app.listen(puerto);
console.log(`Running a GraphQL API server at ${puerto}`);