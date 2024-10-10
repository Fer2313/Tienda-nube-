/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import {
  Field,
  Form as Formm,
  Formik,
  FieldInputProps,
  FormikProps,
} from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { Button } from '../Button'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { text } from '@/chakraStyles/styles'
import loginFunction from '@/services/loginFunction'
import Swal from 'sweetalert2'
import { myFormLogValues } from '@/interfaces/interfaces'

function Form() {
  const router = useRouter()

  async function handleSubmit(values: myFormLogValues) {
    const message = await loginFunction(values)
    Swal.fire({
      title: 'login',
      text: message.message,
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/')
      }
    })
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Debe ser un email.').required('Requerido'),
    password: Yup.string()
      .max(15, 'Debe ser menor a 15 caracteres.')
      .min(8, 'Debe ser mayor a 8 caracteres.')
      .required('Requerido'),
  })

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(props) => (
        <Formm method="post">
          <Box
            display={'flex'}
            flexDir={'column'}
            gap={7}
            alignItems={'center'}
          >
            <Field name="email">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<myFormLogValues['email']>
                form: FormikProps<myFormLogValues>
              }) => (
                <FormControl
                  isInvalid={!!form.errors['email'] && form.touched['email']}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    size={{ base: 'sm', md: 'md', lg: 'md' }}
                    {...field}
                    placeholder="Escribe tu email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<myFormLogValues['password']>
                form: FormikProps<myFormLogValues>
              }) => (
                <FormControl
                  isInvalid={
                    !!form.errors['password'] && form.touched['password']
                  }
                >
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    size={{ base: 'sm', md: 'md', lg: 'md' }}
                    type="password"
                    {...field}
                    placeholder="Escribe tu contraseña"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Box
              display={'flex'}
              fontSize={text}
              gap={2}
              flexDir={'column'}
              alignItems={'center'}
            >
              <Text>
                No tienes cuenta?{' '}
                <Link href={'/register'} className="text-[#1EADFF]">
                  Registrate
                </Link>
              </Text>
              <button type="button" className="text-red-300">
                Recuperar contraseña
              </button>
            </Box>
            <Button
              hover="blue"
              type="submit"
              text={'Ingresar'}
              background="blue"
              color="white"
              onClick={undefined}
            ></Button>
          </Box>
        </Formm>
      )}
    </Formik>
  )
}

export default Form
