import { object, string } from "yup";

export const loginSchema = object({
      email: string().required().email().label("Email address"),
      password: string().required().label("Password"),
})