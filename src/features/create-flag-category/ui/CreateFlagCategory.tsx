"use client";

import { Plus } from "lucide-react";
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { CreateCategorySchema, createCategorySchema } from "../model/create-category-schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib/utils";
import { useCreateFlagCategory } from "@/shared/hooks";
import axios from "axios";
import type { ApiErrorMessage } from "@/shared/types/api-error-types";

export const CreateFlagCategory = () => {
  const { mutateAsync: createFlagCategoryAsync, isPending: isCreating } = useCreateFlagCategory();

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { categoryName: "" },
  });

  const categoryName = useWatch({
    control: form.control,
    name: "categoryName",
  });

  const charsCount = categoryName?.trim().length;

  const handleSubmitForm = async (data: CreateCategorySchema) => {
    const newCategoryName = data.categoryName.trim();

    try {
      await createFlagCategoryAsync(newCategoryName, { onSuccess: () => form.reset() });
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError<ApiErrorMessage>(error)) {
        form.setError("categoryName", { message: error.response?.data.message });
      }
    }
  };

  return (
    <div className="px-4 py-3.5 border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />

        <span className="text-sm font-semibold text-foreground tracking-wide">Flag scales</span>
      </div>

      <Form {...form}>
        <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      variant="neutral"
                      placeholder="Scale name..."
                      className="text-sm h-8 flex-1"
                      {...field}
                    />
                  </FormControl>

                  <Button
                    variant="accent"
                    size="sm"
                    className={cn(
                      "shrink-0 rounded-lg text-xs font-medium active:scale-95 transition-all group",
                      charsCount > 0 ? "" : "opacity-50 pointer-events-none",
                    )}
                    type="submit"
                    disabled={isCreating}
                  >
                    <Plus className="size-3.5 group-hover:rotate-180 transition-transform duration-200" />
                    <span>{isCreating ? "Creating..." : "Create"}</span>
                  </Button>
                </div>

                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
