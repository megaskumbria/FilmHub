import { getTranslations } from "next-intl/server";
import { Separator } from "@/shared/ui";
import {
  FlagScalesSidebar,
  FlagNameFontForm,
  FlagPreview,
  PopularFlagsCarousel,
  PosterUploadSection,
} from "@/widgets";
import { FlagColorPicker, FloatingCreationFlagBar } from "@/features";

export default async function CreationFlagPage() {
  const t = await getTranslations("flags");

  return (
    <div className="max-w-410 w-full px-4 mx-auto pt-20 pb-16">
      <div className="mb-8 flex flex-col">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("title")}</h1>

        <p className="text-base text-zinc-muted mt-1">{t("subtitle")}</p>
      </div>

      <main className="grid w-full items-stretch gap-4 grid-cols-1 xs:max-lg:grid-cols-[minmax(0,1fr)_21.5rem] lg:max-3xl:grid-cols-[20rem_minmax(0,1fr)_21.5rem] 3xl:grid-cols-[minmax(0,23rem)_minmax(0,1fr)_minmax(0,1fr)_21.5rem]">
        <div className="order-2 min-h-0 xs:max-lg:col-span-full xs:max-lg:row-start-2 lg:order-0 lg:col-start-1 lg:max-3xl:row-span-2 3xl:row-span-1">
          <FlagScalesSidebar />
        </div>

        <div className="order-3 h-full min-h-0 min-w-0 xs:max-lg:col-start-1 xs:max-lg:row-start-1 lg:order-0 lg:col-start-2 lg:row-start-1">
          <FlagColorPicker />
        </div>

        <div className="order-4 flex min-h-0 min-w-0 flex-col gap-4 xs:max-lg:col-span-full xs:max-lg:row-start-3 lg:order-0 lg:max-3xl:col-start-2 lg:max-3xl:row-start-2 3xl:col-start-3 3xl:row-start-1">
          <FlagPreview />
          <FlagNameFontForm />
        </div>

        <div className="order-1 xs:max-lg:col-start-2 xs:max-lg:row-start-1 xs:max-lg:self-start lg:order-0 lg:max-3xl:col-start-3 lg:row-start-1 lg:max-3xl:row-span-2 3xl:col-start-4 3xl:row-span-1">
          <PosterUploadSection />
        </div>
      </main>

      <FloatingCreationFlagBar />

      <Separator className="my-8 bg-border/40" />

      <PopularFlagsCarousel />
    </div>
  );
}
