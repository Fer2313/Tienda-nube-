import { MyFormValues } from '@/interfaces/interfaces'
import { FormControl, Input, Text } from '@chakra-ui/react'
import { Field as FieldFormik, FieldInputProps, FormikProps } from 'formik'
import React from 'react'

export default function Field({
  Attribute,
  placeholder,
  type,
}: {
  Attribute: keyof MyFormValues
  placeholder: string
  type: string
}) {
  return (
    <FieldFormik name={Attribute}>
      {({
        field,
        form,
      }: {
        field: FieldInputProps<MyFormValues[typeof Attribute]>
        form: FormikProps<MyFormValues>
      }) => (
        <FormControl
          isInvalid={!!form.errors[Attribute] && form.touched[Attribute]}
        >
          <Input
            {...field}
            rounded={'5px'}
            border={1}
            size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'md' }}
            borderStyle={'solid'}
            borderColor={'gray'}
            bgColor="white"
            type={type}
            placeholder={placeholder}
          />
          <Text fontSize={'xs'} textColor={'red'}>
            {form.errors[Attribute]}
          </Text>
        </FormControl>
      )}
    </FieldFormik>
  )
}
