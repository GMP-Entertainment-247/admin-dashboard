import { object, ref, string } from "yup";

export const loginSchema = object({
      email: string().required().email().label("Email address"),
      password: string().required().label("Password"),
})

export const forgotPasswordSchema = object({
      email: string().required().email().label("Email address"),
})

export const resetPasswordSchema = object({
      newPassword: string()
            .required()
            .label("Password")
            .matches(/^(?=.*[a-z])(?=.*[0-9]).{8,}$/, {
                  message: "Password must contain at least 8 characters, a letter and a number",
            }),
      confirmPassword: string()
            .required()
            .oneOf([ref("password")], "Password doesn't match")
            .label("Confirm Password"),
})

export const verifyOTPSchema = object({
      otp: string().required().label("OTP"),
})