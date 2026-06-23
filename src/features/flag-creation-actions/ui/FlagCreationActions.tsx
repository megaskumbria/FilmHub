import { Button } from "@/shared/ui";
import { Save } from "lucide-react";

export const FlagCreationActions = () => {
  return (
    <div className="col-span-full flex items-center justify-end">
      <Button variant="accent" size="default" className="gap-2 rounded-lg">
        <Save className="size-4" />
        <span>Save flag</span>
      </Button>
    </div>
  );
};
