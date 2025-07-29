import { useTranslation } from "react-i18next";
import { useMatch } from "react-router";
import { getTexts } from "./getTexts";
import type { Step } from "./types";

export const useStepMeta = () => {
  const { t } = useTranslation();

  const match = useMatch("/auth/reset-password/:step");
  const step = match?.params.step as Step;

  const { description, title } = getTexts(t, step || "email");

  return { description, title };
};
