import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import jsonwebtoken from 'jsonwebtoken'

// Base de datos y modelos
import sequelize from './database/database.js'
import './models/user.js'
import './models/order.js'
import './models/order_details.js'
import './models/payment.js'
import './models/product.js'
import './models/product_image.js'
import './models/product_favorite.js'

// Middlewares y utilidades
import { validateUser } from './middlewares/authorization.js'
import { postImageFile } from './handlers/utils/cloudinary.js'

// Rutas principales
import router from './router.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'
import buyRoutes from './routes/buy.js'
import orderRoutes from './routes/order.js'

dotenv.config()
export const server = express()
const serverPort = process.env.PORT || 3000

// Middleware para almacenamiento en memoria (Multer)
const storage = multer.memoryStorage()
const upload = multer({ storage })

// ** Middlewares globales **
server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Configuración de CORS
const allowedOrigins = ['http://localhost:3001', 'https://tienda-nube.vercel.app']
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
server.use(cors(corsOptions))

// ** Rutas públicas **
server.get('/', (req, res) => {
  res.status(200).send('<h1>Hola mundo</h1>')
})
server.use('/api/auth', authRoutes)
server.use('/api/product', productRoutes)
server.use('/api/buy', buyRoutes)
server.use('/api/order', orderRoutes)

// Rutas relacionadas con sesión
server.get('/api/auth/verify-session', validateUser(), (req, res) => {
  res.status(200).json({ message: 'Autorizado' })
})
server.get('/api/auth/get-session', validateUser(), (req, res) => {
  const jwt = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.cookies.jwt
  if (!jwt) {
    return res.status(400).json({ error: 'Debes incluir el token en la cookie' })
  }
  let userPayload
  try {
    jsonwebtoken.verify(jwt, process.env.JWT_SECRET_SESSION_KEY, (err, decoded) => {
      if (err) {
        throw new Error('Algo salió mal')
      }
      userPayload = decoded
    })
    return res.status(200).json(userPayload)
  } catch (error) {
    return res.status(400).json({ error: 'El token proporcionado es inválido' })
  }
})
server.get('/api/auth/logout', validateUser(), (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      domain: process.env.NODE_ENV === 'production' ? 'https://tienda-nube.onrender.com' : 'localhost',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3000000,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/'
    })
    const cookies = req.cookies
    return res.status(200).json({ message: 'Logout exitoso', cookies })
  } catch (error) {
    console.error({ message: 'Algo salió mal', error })
  }
})

server.post('/api/uploadCloudinary', validateUser(), upload.single('image'), postImageFile)

server.use('/api/user', validateUser(), userRoutes)

server.use(router)

// ** Middleware para manejo de rutas no encontradas (404) **
server.use('**', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    mensaje: `No se encontró la ruta ${req.originalUrl}`
  })
})

// ** Inicialización del servidor y base de datos **
async function main () {
  try {
    await sequelize.sync({ force: false })
    console.log('Connection has been established successfully.')
    server.listen(serverPort, () => {
      console.log('Servidor escuchando en el puerto ' + serverPort)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
