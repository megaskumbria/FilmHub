import { Button } from "@/shared/ui";
import { Save } from "lucide-react";
import { useCreateFlag } from "@/shared/hooks";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";

export const FlagCreationActions = () => {
  const { mutate: createFlag } = useCreateFlag();
  const { flagName, selectedColor, bgOpacity, selectedFont, category } = useCreationFlagStore();

  const handleCreateFlag = () => {
    createFlag({
      flagName: flagName,
      color: selectedColor,
      bgOpacity: bgOpacity,
      fontFamily: selectedFont,
      categoryId: category.id,
    });
  };

  return (
    <div className="col-span-full flex items-center justify-end">
      <Button
        onClick={handleCreateFlag}
        variant="accent"
        size="default"
        className="gap-2 rounded-lg"
      >
        <Save className="size-4" />
        <span>Save flag</span>
      </Button>
    </div>
  );
};
