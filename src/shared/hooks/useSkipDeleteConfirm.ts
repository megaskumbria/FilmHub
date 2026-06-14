"use client";

import { useSyncExternalStore } from "react";
import { SKIP_CONFIRM_KEY } from "@/shared/constants/constants";

const getSnapshot = () => localStorage.getItem(SKIP_CONFIRM_KEY) === "true";
const getServerSnapshot = () => false;

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export const useSkipDeleteConfirm = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export const setSkipDeleteConfirm = (value: boolean) => {
  localStorage.setItem(SKIP_CONFIRM_KEY, String(value));
  window.dispatchEvent(new Event("storage"));
};
