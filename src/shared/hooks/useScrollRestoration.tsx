"use client";

import { useEffect } from "react";

export const useScrollRestoration = () => {
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("scroll-position");

    if (savedScroll) window.scrollTo(0, Number(savedScroll));

    const saveScroll = () => sessionStorage.setItem("scroll-position", String(window.scrollY));

    window.addEventListener("scroll", saveScroll);

    return () => window.removeEventListener("scroll", saveScroll);
  }, []);
};
