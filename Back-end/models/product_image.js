import { DataTypes } from 'sequelize'
import sequalize from '../database/database.js'
import Product from './product.js'

const ProductImage = sequalize.define(
  'product_images', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'productId'
      },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'product_images',
    timestamps: false
  })

Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  as: 'images',
  onDelete: 'CASCADE'
})

ProductImage.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

export default ProductImage
