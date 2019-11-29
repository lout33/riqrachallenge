
//resolvers
import { Order } from './../models/Order'
import { Product } from './../models/Product'

export var root = {
  products: () => {
    let pureData: Array<any> = []
    let data = Product.findAll().then((result: any) => {
      for (let i = 0; i < result.length; i++) {
        pureData.push(result[i].dataValues);
      }
      return (pureData)
    })
    return (
      data
    )
  },
  createOrder: ({ order_quantity, producto_id }: any) => {
    let create = Order.create({ order_quantity: order_quantity, producto_id: producto_id }).then((order: any) => {
      return (order)
    })
    return (create)
  }
};