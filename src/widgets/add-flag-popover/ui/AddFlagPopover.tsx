import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/ui";
import { PopoverMode } from "@/widgets/movie-card/ui/MovieCard";

interface AddFlagPopoverProps {
  mode: PopoverMode;
}

export const AddFlagPopover = ({ mode }: AddFlagPopoverProps) => {
  return (
    <>
      {mode === "add-flag" && (
        <div className="flex flex-col gap-2 max-w-52 w-full bg-surface border border-border/70">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  );
};
