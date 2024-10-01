import axios from 'axios'

export default async function protegedRute() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + '/protected-rute',
      {
        withCredentials: true,
      },
    )
    return response.data
  } catch (error) {
    return console.log(error)
  }
}
