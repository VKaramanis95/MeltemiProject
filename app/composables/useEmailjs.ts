
import emailjs from '@emailjs/browser'

export type BookingEmailParams = {
  name: string
  email: string
  phone: string
  pickupDate: string
  returnDate: string
  category: string
  location: string
  notes: string
}

export function useEmailjs() {
  const config = useRuntimeConfig()

  const sendBookingEmail = async (params: BookingEmailParams) => {
    const { serviceId, templateId, publicKey } = config.public.emailjs

    if (!serviceId || !templateId || !publicKey) {
 
      throw new Error(
        'EmailJS is not configured — set NUXT_PUBLIC_EMAILJS_SERVICE_ID, ' +
          'NUXT_PUBLIC_EMAILJS_TEMPLATE_ID and NUXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.'
      )
    }

  
    return await emailjs.send(
      serviceId,
      templateId,
      {
        name: params.name,
        email: params.email,
        phone: params.phone,
        pickup_date: params.pickupDate,
        return_date: params.returnDate,
        category: params.category,
        location: params.location,
        notes: params.notes || '—',
      },
      { publicKey }
    )
  }

  return {
    sendBookingEmail,
  }
}