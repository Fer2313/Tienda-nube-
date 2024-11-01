import User from '../../models/user.js'

export async function getUserById (req, res) {
  const { id } = req.params
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'failedLoginAttempts', 'lockUntil', 'role'] }
    })
    if (!user) {
      return res.status(400).send('No se encontro el usuario')
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}
