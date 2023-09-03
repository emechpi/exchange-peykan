import { z } from "zod";
let passwordRegex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

export const RegisterUserSchema = z
  .object({
    country: z
      .string({
        required_error: "Country is required",
      })
      .min(3, "Country must be more than 3 characters"),
    city: z
      .string({
        required_error: "City is required",
      })
      .min(2, "City must be more than 2 characters"),
    username: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Full name is required"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Email is invalid"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .refine(
        (value) => passwordRegex.test(value),
        "password should contain at least 8 chars, special char, and Uppercase char, Lowercase char"
      ),
    passwordConfirm: z
      .string({
        required_error: "Confirm your password",
      })
      .refine(
        (value) => passwordRegex.test(value),
        "password should contain at least 8 chars, special char, and Uppercase char, Lowercase char"
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .refine(
      (value) => passwordRegex.test(value),
      "password should contain at least 8 chars, special char, and Uppercase char, Lowercase char"
    ),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
