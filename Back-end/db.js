import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const portmysql = process.env.PORTMYSQL;
const database = process.env.DATABASE;

export const pool = createPool({
  host,
  user,
  password,
  portmysql,
  database,
});

export async function checkConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    return 'Connected to the database as ID ' + connection.threadId;
  } catch (err) {
    return 'Error connecting to the database: ' + err.stack;
  } finally {
    if (connection) connection.release();
  }
}
