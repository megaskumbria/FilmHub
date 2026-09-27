import type { ChangePasswordSchema } from "./change-password-schema";

interface PasswordField {
  name: keyof ChangePasswordSchema;
  label: string;
  placeholder: string;
}

export const passwordFields: PasswordField[] = [
  { name: "currentPassword", label: "Current", placeholder: "Current password" },
  { name: "newPassword", label: "New", placeholder: "New password" },
  { name: "confirmPassword", label: "Confirm", placeholder: "Confirm password" },
];
