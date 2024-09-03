import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function validateUser () {
  return (req, res, next) => {
    const { jwt } = req.cookies

    if (!jwt) {
      return res.status(400).json({ error: 'Debes incluir el header con el token' })
    }

    try {
      jsonwebtoken.verify(jwt, process.env.JWT_SECRET_SESSION_KEY)
    } catch (error) {
      return res.status(400).json({ error: 'El token proporcionado es invalido' })
    }

    next()
  }
}
