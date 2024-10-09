import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function validateUser () {
  return (req, res, next) => {
    const jwt = req.headers.authorization ? req.headers.authorization?.split(' ')[1] : req.cookies.jwt

    if (!jwt) {
      return res.status(400).json({ error: 'Debes incluir el token en la cookie' })
    }

    try {
      jsonwebtoken.verify(jwt, process.env.JWT_SECRET_SESSION_KEY)
    } catch (error) {
      return res.status(400).json({ error: 'El token proporcionado es invalido' })
    }

    next()
  }
}
