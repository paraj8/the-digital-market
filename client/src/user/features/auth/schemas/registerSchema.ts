import { z } from "zod";

export const registerSchema =
  z
    .object({
      fullName: z
        .string()
        .min(
          3,
          "Name must be at least 3 characters"
        ),

      email: z.email(
        "Invalid email"
      ),

      password: z
        .string()
        .min(
          6,
          "Password must be at least 6 characters"
        ),

      confirmPassword:
        z.string(),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        path: [
          "confirmPassword",
        ],
        message:
          "Passwords do not match",
      }
    );

export type RegisterFormData =
  z.infer<
    typeof registerSchema
  >;