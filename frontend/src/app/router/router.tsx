import { AppShell } from "@/app/AppShell";
import { AppRoute } from "@/shared/config";
import { createBrowserRouter } from "react-router";

import { NotFoundPage } from "@/pages/404";
import { AuthPage } from "@/pages/auth";
import { HomePage } from "@/pages/home";
import { ResetPasswordPage } from "@/pages/reset-password";

import {
  AuthLayout,
  AuthProvider,
  CodeVerifyForm,
  ConfirmPasswordForm,
  EmailEntryForm,
} from "@/features/auth";
import { PrivateRoute } from "./PrivateRoute";
// import { MoviePage } from "@/pages/movie/ui/MoviePage";

export const router = createBrowserRouter([
  {
    path: AppRoute.AUTH,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: AppRoute.RESET_PASSWORD,
        element: <ResetPasswordPage />,
        children: [
          { path: "email", element: <EmailEntryForm /> },
          { path: "code", element: <CodeVerifyForm /> },
          { path: "new-password", element: <ConfirmPasswordForm /> },
        ],
      },
    ],
  },
  {
    path: AppRoute.ROOT,
    element: (
      <AuthProvider>
        <PrivateRoute />
      </AuthProvider>
    ),
    children: [
      {
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/movie/:id",
            element: <div>Movie Page</div>,
          },
        ],
      },
    ],
  },
  {
    path: AppRoute.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
