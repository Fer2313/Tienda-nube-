import axios from 'axios'

export default async function uploadImage(image: FormData) {
  try {
    const user = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/uploadCloudinary`,
      image,
      {
        withCredentials: true,
      },
    )
    return user.data
  } catch (error) {
    return console.log(error)
  }
}
