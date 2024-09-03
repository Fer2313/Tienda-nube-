import { DataTypes } from 'sequelize'
import sequalize from '../database/database.js'
import Order from './order.js'

const Payment = sequalize.define(
  'payments',
  {
    paymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'orderId'
      }
    },
    paymentMethod: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    paymentStatus: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

Payment.belongsTo(Order, { foreignKey: 'orderId' })
Order.hasMany(Payment, { foreignKey: 'orderId' })

export default Payment
