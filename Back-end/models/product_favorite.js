import { DataTypes } from 'sequelize'
import sequalize from '../database/database.js'
import Product from './product.js'
import User from './user.js'

const FavoriteProduct = sequalize.define(
  'favorite_products',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'userId'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'productId'
      }
    }
  },
  {
    timestamps: false
  }
)

User.hasMany(FavoriteProduct, {
  foreignKey: 'userId',
  as: 'favoriteProducts'
})
FavoriteProduct.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

Product.hasMany(FavoriteProduct, {
  foreignKey: 'productId',
  as: 'favoritedByUsers'
})
FavoriteProduct.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

export default FavoriteProduct
