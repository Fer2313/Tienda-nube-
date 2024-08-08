"use client";
import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../Button";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { text } from "@/app/chakraStyles/styles";
/* repeatPasword */
function FormReg() {
  function handleSubmit(values: any) {
    console.log(values);
  }
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    lastName: Yup.string().required("Requerido"),
    email: Yup.string().email("Debe ser un email.").required("Requerido"),
    phone: Yup.string().required("Requerido"),
    password: Yup.string()
      .max(15, "Debe ser menor a 15 caracteres.")
      .min(8, "Debe ser mayor a 8 caracteres.")
      .required("Requerido"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
  });
  return (
    <Formik
      initialValues={{ lastName:"", name:"", email: "", password: "", repeatPassword: "", phone:"" }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(props) => (
        <Form method="post">
          <Box
            display={"flex"}
            flexDir={"column"}
            gap={3}
            alignItems={"center"}
          >
            <Box display={"flex"} gap={2}>
            <Field name="name">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md", lg: "md" }}
                    {...field}
                    placeholder="Escribe tu nombre"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.lastName && form.touched.lastName}
                >
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md", lg: "md" }}
                    {...field}
                    placeholder="Escribe tu apellido"
                  />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            </Box>
            <Field name="phone">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.phone && form.touched.phone}
                >
                  <FormLabel>Telefono</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md", lg: "md" }}
                    {...field}
                    placeholder="Escribe tu telefono"
                  />
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email</FormLabel>
                  <Input type="email"
                    size={{ base: "sm", md: "md", lg: "md" }}
                    {...field}
                    placeholder="Escribe tu email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md", lg: "md" }}
                    type="password"
                    {...field}
                    placeholder="Escribe tu contraseña"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="repeatPassword">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.repeatPassword && form.touched.repeatPassword
                  }
                >
                  <FormLabel>Repite la Contraseña</FormLabel>
                  <Input
                    size={{ base: "sm", md: "md", lg: "md" }}
                    type="password"
                    {...field}
                    placeholder="Escribe tu contraseña"
                  />
                  <FormErrorMessage>
                    {form.errors.repeatPassword}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Box
              display={"flex"}
              fontSize={text}
              gap={2}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Text>
                Tienes cuenta?{" "}
                <Link href={"/login"} className="text-[#1EADFF]">
                  Ingresa
                </Link>
              </Text>
            </Box>
            <Button
              hover="blue"
              type="submit"
              text={"Registrarse"}
              background="blue"
              color="white"
              onClick={undefined}
            ></Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default FormReg;
