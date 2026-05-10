import z from "zod";

export const signUpFormSchema = z
  .object({
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

// const emailOrPhone = z
//   .string()
//   .min(1, "Enter email or phone")
//   .refine(
//     (val) => z.string().email().safeParse(val).success || /^\+?[\d\s()-]{10,}$/.test(val),
//     "Invalid email or phone number",
//   );

export const signInSchema = z.object({
  // emailOrPhone,
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
