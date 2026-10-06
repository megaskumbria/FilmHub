import type { ChangePasswordSchema } from "./change-password-schema";

export const passwordFields: { name: keyof ChangePasswordSchema }[] = [
  { name: "currentPassword" },
  { name: "newPassword" },
  { name: "confirmPassword" },
];
