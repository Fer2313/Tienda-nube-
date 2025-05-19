// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago'
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-3294541294204428-111407-4fd8c402ec48315133e6e1d32982a59e-2096688886' })

export const createPreference = async (req, res) => {
  if (!req.body.idProduct || !req.body.title || !req.body.quantity || !req.body.price) {
    return res.status(400).send('No se ha podido crear la preferencia')
  }
  try {
    const body = {
      items: [
        {
          description: `Cliente: -${req.body.userId}-`,
          id: req.body.idProduct,
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: 'ARS'
        }
      ],
      back_urls: {
        success: 'https://www.youtube.com/@onthecode',
        failure: 'https://www.youtube.com/@onthecode',
        pending: 'https://www.youtube.com/@onthecode'
      },
      notification_url: 'https://f16a-201-220-152-22.ngrok-free.app/api/buy/webhook',
      auto_return: 'approved'
    }
    const preference = new Preference(client)
    const result = await preference.create({ body })
    return res.json({ id: result.id })
  } catch (error) {
    return res.status(500).send('Error al realizar la peticion')
  }
}
