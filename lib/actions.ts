'use server'

import { z } from 'zod'
import { ContactFormSchema } from './schemas'
import { redirect } from 'next/navigation'

type Inputs = z.infer<typeof ContactFormSchema>

export async function contactFormAction(data: Inputs) {
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const endpoint = process.env.BASIN_ENDPOINT as string

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('An error occurred. Please try again.')
    }
  } catch (error: any) {
    return { error: error.message || 'An error occurred. Please try again.' }
  }

  redirect('/thank-you')
}
