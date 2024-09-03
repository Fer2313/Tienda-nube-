import { DataTypes } from 'sequelize'
import sequalize from '../database/database.js'

const Product = sequalize.define(
  'products',
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    category: {
      type: DataTypes.ENUM('Iluminacion', 'Hogar', 'Camping'),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

export default Product
