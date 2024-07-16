import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cors from "cors";
import { checkConnection } from "./db.js";

dotenv.config();

const server = express();
const serverPort = process.env.PORT;

server.listen(serverPort, async () => {
  console.log("Hola mundo en el puerto " + serverPort);
  const promise = await checkConnection();
  console.log(promise);
});

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(router);
