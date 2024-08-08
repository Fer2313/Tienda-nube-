import { DataTypes } from "sequelize";
import sequalize from "../database/database.js";
import Order from "./order.js";
import Product from "./product.js";

const OrderDetails = sequalize.define(
  "orderDetails",
  {
    orderDetailsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "orderId",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productId",
      },
    },
    amont: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Order.hasMany(OrderDetails, { foreignKey: "orderId" });
OrderDetails.belongsTo(Order, { foreignKey: "orderId" });
Product.hasMany(OrderDetails, { foreignKey: "productId" });
OrderDetails.belongsTo(Product, { foreignKey: "productId" });

export default OrderDetails;
