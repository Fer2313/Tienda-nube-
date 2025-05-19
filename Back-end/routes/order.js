import router from '../router.js'
import * as order from '../handlers/order/create_order.js'

router.post('/', order.createOrder)

export default router
