import { DataTypes } from "sequelize";
import sequalize from "../database/database.js";
import Order from "./order.js";

const Shipment = sequalize.define(
  "shipment",
  {
    shipmentId:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    orderId:{
     type: DataTypes.INTEGER,
     references:{
        model: Order,
        key: "orderId",
     }
    },
    shipmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Order.hasMany(Shipment, { foreignKey: 'orderId' });
Shipment.belongsTo(Order, { foreignKey: 'orderId' });

export default Shipment;
