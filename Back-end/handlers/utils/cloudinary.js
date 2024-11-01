import { v2 as cloudinary } from 'cloudinary'

import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function postImageFile (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió el archivo' })
  }
  cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
    if (error) {
      throw Error('Error al subir la imagen a Cloudinary')
    }
    res.json({ url: result.secure_url })
  }).end(req.file.buffer)
}
