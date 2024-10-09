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

server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const allowedOrigins = ['http://localhost:3001', 'https://tienda-nube.vercel.app']
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
server.use(
  cors(corsOptions)
)

server.use('/api/auth', authRoutes)
server.use('/api/product', productRoutes)

server.use(validateUser())

server.get('/api/auth/verify-session', (req, res) => {
  res.status(200).json({ message: 'Autorizado' })
})
server.get('/api/auth/logout', (res, req) => {
  res.clearCookie('jwt')
  return res.status(200).json({ message: 'Logout exitoso' })
})

server.use(router)

/* const allowedOrigins = ['http://localhost:3001', 'https://tienda-nube.vercel.app']

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

server.use(
  cors(corsOptions)
)
 */
