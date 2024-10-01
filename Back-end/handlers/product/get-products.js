import { Op, Sequelize } from 'sequelize'
import Product from '../../models/product.js'
import ProductImage from '../../models/product_image.js'

function getProductsByName (name) {
  return Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('productName')), {
    [Op.like]: `%${name.toLowerCase()}%`
  })
}

export async function getAllProducts (req, res) {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductImage,
          as: 'images',
          separate: true,
          limit: 1
        }
      ]
    })
    if (!products.length) {
      return res.status(400).send('No se encontraron productos')
    }
    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).send('Error al realizar la peticion')
  }
}

export async function getProducts (req, res) {
  const { id } = req.query
  try {
    let products
    if (id) {
      const mainProduct = await Product.findOne({
        where: { productId: id }, // Asegúrate de que `productId` es el nombre correcto del campo en tu tabla
        attributes: ['productName', 'category'] // Solo necesitamos el nombre del producto principal
      })

      if (!mainProduct) {
        return res.status(404).send('Producto principal no encontrado')
      }
      const { productName, category } = mainProduct
      products = await Product.findAll({
        where: {
          category,
          productId: { [Op.ne]: id } // Excluye el producto principal usando `Op.ne` (no igual)
        },
        include: [
          {
            model: ProductImage,
            as: 'images',
            separate: true,
            limit: 1
          }
        ],
        order: [
          // Ordenar para dar prioridad a los productos que más se parezcan al nombre del producto principal
          [
            Sequelize.literal(`CASE 
            WHEN productName LIKE '${productName}%' THEN 1
            WHEN productName LIKE '%${productName}%' THEN 2
            ELSE 3 END`),
            'ASC'
          ]
        ],
        limit: 8
      })
    } else {
      products = await Product.findAll({
        include: [
          {
            model: ProductImage,
            as: 'images',
            separate: true,
            limit: 1
          }
        ],
        limit: 8
      })
    }

    if (!products.length) {
      return res.status(400).send('No se encontraron productos')
    }
    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getProductsByQuery = async (req, res) => {
  const { name, color } = req.query
  const productName = name
  if (!name) {
    return res.status(400).send('No se proporcionaron el nombre')
  }
  try {
    let products
    if (color) {
      products = await Product.findAll({
        attributes: ['productId', 'color'],
        where: getProductsByName(productName)
      })
    } else {
      products = await Product.findAll({
        where: getProductsByName(productName)
      })
    }
    if (!products.length) {
      return res.status(400).send('No se encontraron productos')
    }
    return res.status(200).json(products)
  } catch (error) {}
}

export const getProductsFilters = async (req, res) => {
  const { category, priceMin, priceMax, price, name, page, pageSize } =
    req.query
  const where = {}
  let order = [['productName', 'ASC']]
  try {
    if (!category && !priceMin && !priceMax && !name && !page && !pageSize && !price) {
      return res.status(400).send('No se pasaron datos')
    }
    if (!page || !pageSize) {
      return res
        .status(400)
        .send('No se paso el numero de pagina y el tamaño de registros a mostrar')
    }
    if (category) {
      where.category = category
    }
    if (name) {
      where.productName = getProductsByName(name)
    }
    if (price) {
      if (price === 'menor-mayor') {
        order = [['price', 'ASC']]
      }
      if (price === 'mayor-menor') {
        order = [['price', 'DESC']]
      }
    }
    if (priceMin && priceMax) {
      where.price = {
        [Op.between]: [priceMin, priceMax]
      }
    }

    const pageNumber = parseInt(page) || 1
    const pageSizeNumber = parseInt(pageSize) || 10
    const offset = (pageNumber - 1) * pageSizeNumber
    const limit = pageSizeNumber

    const productsCount = await Product.count({
      where
    })

    const productsData = await Product.findAll({
      where,
      order,
      offset,
      limit,
      include: [
        {
          model: ProductImage,
          as: 'images',
          separate: true,
          limit: 1
        }
      ]
    })
    return res.status(200).json({ productsCount, productsData })
  } catch (error) {
    return res.status(500).json(error)
  }
}
