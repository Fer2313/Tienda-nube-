import express from 'express'
import dotenv from 'dotenv'
import router from './router.js'
import cors from 'cors'
import sequelize from './database/database.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import './models/user.js'
import './models/order.js'
import './models/order_details.js'
import './models/payment.js'
import './models/product.js'
import './models/product_image.js'
import cookieParser from 'cookie-parser'
import { validateUser } from './middlewares/authorization.js'

dotenv.config()

export const server = express()
const serverPort = process.env.PORT || 3000

server.get('/', (req, res) => {
  res.status(200).send('<h1>Hola mundo</h1>')
})

async function main () {
  try {
    await sequelize.sync({ force: false })
    console.log('Connection has been established successfully.')
    server.listen(serverPort, () => {
      console.log('Hola mundo en el puerto ' + serverPort)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()

server.use(
  cors({
    origin: ['http://localhost:3001', ''], // Origen permitido
    credentials: true // Permite el uso de cookies y credenciales
  })
)

server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/api/auth', authRoutes)
server.use('/api/product', productRoutes)

server.use(validateUser())

server.get('/api/verify-session', (req, res) => {
  res.status(200).json({ message: 'Autorizado' })
})

server.use(router)

/*
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
}) */
