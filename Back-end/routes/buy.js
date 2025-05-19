import router from '../router.js'
import * as preference from '../handlers/buy/create_preference.js'
import * as webhook from '../handlers/buy/webhook.js'

router.post('/create_preference', preference.createPreference)
router.post('/webhook', webhook.webhookController)

export default router
