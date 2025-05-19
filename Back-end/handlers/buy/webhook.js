import axios from 'axios'
import User from '../../models/user.js'
import Order from '../../models/order.js'
import Payment from '../../models/payment.js'

export const webhookController = async (req, res) => {
  const paymentParams = req.query
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer APP_USR-3294541294204428-111407-4fd8c402ec48315133e6e1d32982a59e-2096688886'
  }
  if (paymentParams.type === 'payment') {
    const payment = await axios.get('https://api.mercadopago.com/v1/payments/' + [paymentParams['data.id']], { headers })
    const paymentData = payment.data.additional_info.items
    console.log(paymentData)
    const userId = paymentData[0].description.replace(/[^0-9]+/g, '')
    const order = await Order.findOne({ where: { userId } })
    console.log(order, 'order jaja')
    if (payment.data.status === 'rejected' || payment.data.status === 'cancelled' || payment.data.status === 'refunded') {
      const user = await User.findByPk(userId)
      if (!user.email) {
        User.destroy({
          where: { userId }
        })
      }
      if (order) {
        await Order.update({ status: 'cancelled' }, { where: { userId } })
        await Payment.create({ orderId: order.orderId, paymentMethod: payment.data.payment_method.type, paymentStatus: payment.data.status })
      }
    } else if (payment.data.status === 'approved') {
      if (order) {
        await Order.update({ status: 'approved' }, { where: { userId } })
        await Payment.create({ orderId: order.orderId, paymentMethod: payment.data.payment_method.type, paymentStatus: payment.data.status })
      }
    }
  }
  res.sendStatus(200)
}
