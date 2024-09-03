import User from '../../models/user.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const loginHandler = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send('Faltan Datos')
  }
  const ifUser = await User.findOne({
    where: { email }
  })
  if (!ifUser) {
    return res.status(400).send('El email o la contraseña son incorrectos')
  }
  if (ifUser.lockUntil > Date.now()) {
    return res.status(400).send('Demaciados intentos realizados, intente mas tarde')
  }
  const compare = await bcrypt.compare(password, ifUser.password)
  if (!compare) {
    ifUser.failedLoginAttempts += 1
    if (ifUser.failedLoginAttempts >= process.env.MAX_FAILED_ATTEMPTS) {
      const newDate = new Date(Date.now() + 300000)
      ifUser.lockUntil = newDate
    }
    await ifUser.save()
    return res.status(400).send('El email o la contraseña son incorrectos')
  }
  ifUser.failedLoginAttempts = 0
  ifUser.lockUntil = null
  await ifUser.save()
  const tokenpayload = {
    userId: ifUser.userId,
    name: ifUser.name,
    lastName: ifUser.lastName,
    role: ifUser.role
  }
  try {
    const token = jwt.sign(tokenpayload, process.env.JWT_SECRET_SESSION_KEY, { expiresIn: process.env.JWT_EXPIRES })
    const cookieConfig = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3000000,
      sameSite: 'Lax',
      path: '/'
    }
    return res.cookie('jwt', token, cookieConfig).status(200).json({ message: 'Login exitoso', tokenpayload })
  } catch (error) {
    return res.status(500).send('Ha ocurrido un error con el servidor')
  }
}
