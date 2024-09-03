import Sequalize from 'sequelize'

import dotenv from 'dotenv'

dotenv.config()

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

const sequalize = new Sequalize(database, user, password, {
  host,
  dialect: 'mysql'
})

export default sequalize
