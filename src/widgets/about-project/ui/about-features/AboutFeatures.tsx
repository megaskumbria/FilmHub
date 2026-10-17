import { AboutCardDemo } from "./AboutCardDemo";
import { AboutCollectionsDeck } from "./AboutCollectionsDeck";

export const AboutFeatures = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 sm:px-8 lg:flex-row">
      <AboutCollectionsDeck />
      <AboutCardDemo />
    </div>
  );
};
