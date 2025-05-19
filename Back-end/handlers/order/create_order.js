import Order from '../../models/order.js'
import OrderDetails from '../../models/order_details.js'

export async function createOrder (req, res) {
  const { userId, totalAmount, status } = req.body.order
  // TODO Corregir el "totalAmont" cuando se reinicien las tablas
  const order = { userId, totalAmount, status }
  const orderDetails = req.body.orderDetails
  try {
    if (!userId || !totalAmount || !status || !orderDetails.length) {
      return res.status(400).send('No se ha recibido la orden de compra')
    }
    const newOrder = await Order.create(order)
    const orderId = newOrder.dataValues.orderId
    for (let index = 0; index < orderDetails.length; index++) {
      orderDetails[index].orderId = newOrder.dataValues.orderId
      console.log(orderDetails[index])
      console.log(await OrderDetails.create(orderDetails[index]))
    }
    return res.status(200).json({ status: 'ok', message: 'Se ha realizado la orden ' + orderId })
  } catch (error) {
    return res.status(500).json(error)
  }
}
