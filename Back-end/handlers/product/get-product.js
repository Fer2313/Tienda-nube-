import Product from '../../models/product.js'
import ProductImage from '../../models/product_image.js'

export const getProductByID = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findByPk(id, {
      include: [{
        model: ProductImage,
        as: 'images'
      }]
    })
    if (!product) {
      return res.status(400).send('No se encontro el producto')
    }
    res.status(200).json(product)
  } catch (error) {
    return res.status(500).send('Error al realizar la peticion')
  }
}
