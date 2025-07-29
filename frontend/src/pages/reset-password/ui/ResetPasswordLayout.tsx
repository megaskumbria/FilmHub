import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui";
import { Outlet } from "react-router";
import { useStepMeta } from "../model/useStepMeta";

export const ResetPasswordLayout = () => {
  const { description, title } = useStepMeta();

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};
