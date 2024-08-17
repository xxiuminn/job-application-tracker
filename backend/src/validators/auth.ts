import { z } from "zod";

const RegistrationSchema = z.object({
  name: z
    .string({ message: "name must be a string" })
    .nonempty({ message: "can't be empty" }),
  email: z.string().email().nonempty({ message: "can't be empty" }),
  password: z
    .string()
    .min(8, { message: "password must be more than 8 characters long" })
    .nonempty({ message: "can't be empty" }),
});

const LoginSchema = z.object({
  email: z.string().email().nonempty({ message: "can't be empty" }),
  password: z.string().nonempty().min(8, { message: "must be more than 8" }),
});

export { RegistrationSchema, LoginSchema };
