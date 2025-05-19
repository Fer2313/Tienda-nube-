import { DataTypes } from 'sequelize'
import sequalize from '../database/database.js'
import User from './user.js'

const Order = sequalize.define(
  'orders',
  {
    orderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'userId'
      }
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

Order.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Order, { foreignKey: 'userId' })

export default Order
