import router from '../router.js'
import * as getproducts from '../handlers/product/get-products.js'
import * as getproduct from '../handlers/product/get-product.js'

router.get('/getAllProducts', getproducts.getAllProducts)
router.get('/getProductsFilters', getproducts.getProductsFilters)
router.get('/getProducts', getproducts.getProducts)
router.get('/getProductsByName', getproducts.getProductsByQuery)
router.get('/getProduct/:id', getproduct.getProductByID)

export default router
