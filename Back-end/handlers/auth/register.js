import User from '../../models/user.js'
import bcrypt from 'bcrypt'

export const registerHandler = async (req, res) => {
  const { name, lastName, cellphone, email, password } = req.body
  if (!name || !lastName || !cellphone || !email || !password) {
    return res.status(400).send('Faltan datos')
  }
  const ifUser = await User.findOne({
    where: { email }
  })
  if (ifUser) {
    return res.status(400).send('Ese usuario ya existe')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { name, lastName, cellphone, email, password: hashedPassword }
  try {
    User.create(newUser)
    return res.status(200).json({ message: 'Su cuenta ha sido creado exitosamente' })
  } catch (error) {
    return res.status(500).send('Ha ocurrido un error al crear el usuario')
  }
}
