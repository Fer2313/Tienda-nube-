import User from '../../models/user.js'

export async function updateUserById (req, res) {
  const { id } = req.params
  const newUser = req.body
  try {
    const [result] = await User.update(newUser, {
      where: {
        userId: id
      }
    })
    return res.status(200).json({ userUpdated: result })
  } catch (error) {
    return res.status(500).json(error)
  }
}
