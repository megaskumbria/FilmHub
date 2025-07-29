import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui";
import { Outlet, useMatch } from "react-router";

export const ResetPasswordPage = () => {
  // const { renderStep, description, title } = useResetPassword();
  const match = useMatch("/auth/reset-password/:step");
  const step = match?.params.step;

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>{step}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};
