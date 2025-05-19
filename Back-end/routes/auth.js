import * as register from '../handlers/auth/register.js'
import * as login from '../handlers/auth/login.js'
import * as createNotRegisterUser from '../handlers/auth/create_not_register_user.js'
import router from '../router.js'

router.post('/register', register.registerHandler)
router.post('/login', login.loginHandler)
router.post('/create_not_register_user', createNotRegisterUser.createNotRegisterUser)

export default router
