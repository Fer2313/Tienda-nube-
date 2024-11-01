import router from '../router.js'
import * as getUser from '../handlers/user/get-user-by-id.js'
import * as updateUser from '../handlers/user/update-user-by-id.js'

router.get('/requests/:id', getUser.getUserById)
router.put('/update/:id', updateUser.updateUserById)

export default router
