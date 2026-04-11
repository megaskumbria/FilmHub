"use client";

import { useEffect, useRef, useCallback } from "react";

type Options = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
};

export function useIntersectionObserver(onIntersect: () => void, options: Options = {}) {
  const { root = null, rootMargin = "0px", threshold = 0, enabled = true } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: Element | null) => {
      if (!enabled) return;

      if (observerRef.current) observerRef.current.disconnect();

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry.isIntersecting) {
            onIntersect();
          }
        },
        { root, rootMargin, threshold },
      );

      observerRef.current.observe(node);
    },
    [onIntersect, root, rootMargin, threshold, enabled],
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return ref;
}
