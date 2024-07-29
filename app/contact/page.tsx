'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { ContactFormSchema } from '@/lib/schemas'
import { contactFormAction } from '@/lib/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type Inputs = z.infer<typeof ContactFormSchema>

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await contactFormAction(data)

    if (result?.error) {
      toast.error(result.error)
      return
    }
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Contact Us</h1>

        <form
          noValidate
          onSubmit={handleSubmit(processForm)}
          className='mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2'
        >
          <div>
            <Input placeholder='Name' {...register('name')} />
            {errors.name?.message && (
              <p className='ml-1 mt-1 text-xs text-red-400'>
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input type='email' placeholder='email' {...register('email')} />
            {errors.email?.message && (
              <p className='ml-1 mt-1 text-xs text-red-400'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='col-span-full'>
            <Textarea rows={5} placeholder='Message' {...register('message')} />
            {errors.message?.message && (
              <p className='ml-1 mt-1 text-xs text-red-400'>
                {errors.message.message}
              </p>
            )}
          </div>
          <div className='col-span-full'>
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              <span>{isSubmitting ? 'Submitting' : 'Contact'}</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
