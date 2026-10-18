import { AboutHero } from "./AboutHero";
import { AboutFeatures } from "./about-features/AboutFeatures";
import { AboutFlags } from "./about-flags/AboutFlags";
import { AboutCall } from "./AboutCall";
// import { AboutRoadmap } from "./about-roadmap/AboutRoadmap";
import { AboutCommunity } from "./AboutCommunity";
import { AboutSupport } from "./AboutSupport";

export const AboutProject = () => {
  return (
    <main className="flex flex-col gap-24 overflow-x-clip pb-28 pt-20 sm:gap-32 sm:pt-24">
      <AboutHero />
      <AboutFeatures />
      <AboutFlags />
      <AboutCall />
      {/* <AboutRoadmap /> */}
      <AboutCommunity />
      <AboutSupport />
    </main>
  );
};
