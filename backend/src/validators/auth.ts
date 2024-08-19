import { z } from "zod";

const RegistrationSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .min(1, { message: "name field can't be empty" }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "please check email",
    })
    .email()
    .min(1, { message: "email field can't be empty" }),
  password: z
    .string()
    .min(8, { message: "password must be more than 8 characters long" }),
});

const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "please check email",
    })
    .email()
    .min(1, { message: "email field can't be empty" }),
  password: z
    .string({
      required_error: "pw is required",
      invalid_type_error: "pw must be a string",
    })
    .min(8, { message: "pw must be more than 8 characters" }),
});

export { RegistrationSchema, LoginSchema };
