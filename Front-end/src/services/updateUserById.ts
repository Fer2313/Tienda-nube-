import { UserData } from '@/interfaces/interfaces'
import axios from 'axios'
import { customAlert } from './alert'

export default async function updateUserById(
  id: number | undefined,
  body: UserData,
) {
  try {
    const result = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/update/${id}`,
      body,
      {
        withCredentials: true,
      },
    )
    customAlert(
      'Usuario actualizado',
      'Su informacion ha sido actualizada con exito',
      'success',
      'Ok',
    )
    return result
  } catch (error) {
    customAlert(
      'Algo ha salido mal',
      'No se pudo actualizar su informacion',
      'error',
      'Ok',
    )
    return console.log(error)
  }
}
