import Sequelize from 'sequelize' // Asegúrate de importar correctamente
import dotenv from 'dotenv'

dotenv.config() // Cargar las variables de entorno

const host = process.env.HOST
const user = process.env.USER
const port = process.env.PORTMYSQL
const password = process.env.MYSQL_PASSWORD
const database = process.env.DATABASE

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'mysql' // Asegúrate de que el dialecto sea MySQL
})

export default sequelize
