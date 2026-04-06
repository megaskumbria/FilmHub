import z from "zod";

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(2, "Firstname must be at least 2 characters"),
    lastName: z.string().min(2, "Lastname must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const emailOrPhone = z
  .string()
  .min(1, "Enter email or phone")
  .refine(
    (val) => z.string().email().safeParse(val).success || /^\+?[\d\s()-]{10,}$/.test(val),
    "Invalid email or phone number",
  );

export const authModalSignInSchema = z.object({
  emailOrPhone,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const authModalSignUpSchema = z.object({
  emailOrPhone,
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type AuthModalSignInSchema = z.infer<typeof authModalSignInSchema>;
export type AuthModalSignUpSchema = z.infer<typeof authModalSignUpSchema>;
