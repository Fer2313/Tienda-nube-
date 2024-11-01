import axios from 'axios'

export default async function getUserById(id: number | undefined) {
  try {
    if (id) {
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/requests/${id}`,
        {
          withCredentials: true,
        },
      )
      return user.data
    } else console.log('No se ha pasado un id')
  } catch (error) {
    return console.log(error)
  }
}
