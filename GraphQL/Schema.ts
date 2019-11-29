var { buildSchema } = require('graphql');

export var schema = buildSchema(`
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