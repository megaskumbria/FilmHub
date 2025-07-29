import type { TFunction } from "i18next";
import type { Step } from "./types";

export const getTexts = (t: TFunction, step: Step) => {
  const texts = {
    email: {
      title: t("resetPassword.steps.email.title"),
      description: t("resetPassword.steps.email.description"),
    },
    code: {
      title: t("resetPassword.steps.code.title"),
      description: t("resetPassword.steps.code.description"),
    },
    "new-password": {
      title: t("resetPassword.steps.newPassword.title"),
      description: t("resetPassword.steps.newPassword.description"),
    },
  };

  return texts[step];
};
