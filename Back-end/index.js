import express from 'express'
import dotenv from 'dotenv'
import router from './router.js'
import cors from 'cors'
import sequelize from './database/database.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'
import './models/user.js'
import './models/order.js'
import './models/order_details.js'
import './models/payment.js'
import './models/product.js'
import './models/product_image.js'
import './models/product_favorite.js'
import cookieParser from 'cookie-parser'
import { validateUser } from './middlewares/authorization.js'
import jsonwebtoken from 'jsonwebtoken'
import { postImageFile } from './handlers/utils/cloudinary.js'
import multer from 'multer'

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
const storage = multer.memoryStorage()
const upload = multer({ storage })
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
server.get('/api/auth/get-session', (req, res) => {
  const jwt = req.headers.authorization ? req.headers.authorization?.split(' ')[1] : req.cookies.jwt
  if (!jwt) {
    return res.status(400).json({ error: 'Debes incluir el token en la cookie' })
  }
  let userPayload
  try {
    jsonwebtoken.verify(jwt, process.env.JWT_SECRET_SESSION_KEY, (err, decoded) => {
      if (err) {
        throw Error('Algo a salido mal')
      }
      if (decoded) {
        userPayload = decoded
      }
    })
    return res.status(200).json(userPayload)
  } catch (error) {
    return res.status(400).json({ error: 'El token proporcionado es invalido' })
  }
})
server.get('/api/auth/logout', (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      domain: process.env.NODE_ENV === 'production' ? 'app-tienda-nube.fly.dev' : 'localhost',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3000000,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/'
    })
    const cookies = req.cookies
    return res.status(200).json({ message: 'Logout exitoso', cookies })
  } catch (error) {
    console.error({ message: 'Algo a ocurrido mal', error })
  }
})
server.post('/api/uploadCloudinary', upload.single('image'), postImageFile)

server.use('/api/user', userRoutes)

server.use(router)
