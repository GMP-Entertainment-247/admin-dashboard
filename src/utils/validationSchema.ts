import { array, object, ref, string } from "yup";

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
      otp: string().required().min(6, "Must be 6 characters").max(6, "Must be 6 characters").label("OTP"),
})

export const inviteAdminSchema = object({
      firstName: string().required().label("First Name"),
      lastName: string().required().label("Last Name"),
      email: string().required().email().label("Email address"),
      phone: string().required().label("Phone Number"),
      roles: array().of(string()).min(1, "Please select at least one role")
})

export const changePasswordSchema = object({
      current_password: string().required().label("Current Password"),
      new_password: string()
            .required()
            .label("New Password")
            .matches(/^(?=.*[a-z])(?=.*[0-9]).{8,}$/, {
                  message: "Password must contain at least 8 characters, a letter and a number",
            }),
      password_confirmation: string()
            .required()
            .oneOf([ref("new_password")], "Password doesn't match")
            .label("Confirm Password"),
})