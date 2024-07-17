import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cors from "cors";
import sequelize from "./database/database.js";
import "./models/user.js";
import "./models/order.js";
import "./models/order_details.js";
import "./models/payment.js";
import "./models/product.js";

dotenv.config();

export const server = express();
const serverPort = process.env.PORT;

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
    server.listen(serverPort, () => {
      console.log("Hola mundo en el puerto " + serverPort);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(router);
