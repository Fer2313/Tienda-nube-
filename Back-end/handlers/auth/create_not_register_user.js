import User from '../../models/user.js'

export const createNotRegisterUser = async (req, res) => {
  const newUser = req.body
  if (!newUser.name && !req.body.lastName && !req.body.cellphone) {
    return res.status(400).send('Faltan datos importantes')
  }
  try {
    console.log(req.body.name, req.body.lastName, req.body.cellphone)
    const useer = await User.findOne({
      where: { email: req.body.email }
    })
    const userDup = await User.findOne({
      where: { name: req.body.name, lastName: req.body.lastName, cellphone: req.body.cellphone }
    })
    if (userDup || useer) {
      return res.status(400).send('Ya hay un usuario con esos campos')
    }
    newUser.noUserEmail = newUser.email
    newUser.email = ''
    newUser.password = ''
    const user = await User.create(newUser)
    return res.status(200).json({ message: 'Su usuario ha sido creado exitosamente', id: user.userId })
  } catch (error) {
    return res.status(500).send('No se pudo crear el usuario')
  }
}
