"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const EPSILON = 0.001;

interface FitBox {
  scale: number;
  width: number;
  height: number;
}

export interface FitScaleMeasurement {
  containerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  reservedRef: RefObject<HTMLSpanElement | null>;
  scale: number;
  width: number | undefined;
  height: number | undefined;
  contentStyle: CSSProperties;
}

export function useFitScale(): FitScaleMeasurement {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reservedRef = useRef<HTMLSpanElement>(null);
  const [fit, setFit] = useState<FitBox | null>(null);

  const measureRef = useRef(() => {});

  measureRef.current = () => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const snapshot = {
      position: content.style.position,
      width: content.style.width,
      transform: content.style.transform,
    };

    content.style.position = "absolute";
    content.style.width = "max-content";
    content.style.transform = "none";

    const styles = getComputedStyle(container);
    const gapRaw = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
    const gap = Number.parseFloat(gapRaw) || 0;
    const paddingX =
      (Number.parseFloat(styles.paddingLeft) || 0) + (Number.parseFloat(styles.paddingRight) || 0);

    const reservedWidth = reservedRef.current?.offsetWidth ?? 0;
    const available =
      container.clientWidth - paddingX - reservedWidth - (reservedWidth > 0 ? gap : 0);

    const needed = content.offsetWidth;
    const naturalHeight = content.offsetHeight;

    content.style.position = snapshot.position;
    content.style.width = snapshot.width;
    content.style.transform = snapshot.transform;

    if (available <= 0 || needed <= 0 || naturalHeight <= 0) return;

    const scale = needed - available <= 0.5 ? 1 : Math.min(1, available / needed);
    const width = needed * scale;
    const height = naturalHeight * scale;

    setFit((prev) => {
      if (
        prev
        && Math.abs(prev.scale - scale) < EPSILON
        && Math.abs(prev.width - width) < 0.5
        && Math.abs(prev.height - height) < 0.5
      ) {
        return prev;
      }

      return { scale, width, height };
    });
  };

  useIsoLayoutEffect(() => {
    measureRef.current();
  });

  useIsoLayoutEffect(() => {
    const run = () => measureRef.current();
    const observer = new ResizeObserver(run);
    const container = containerRef.current;
    const content = contentRef.current;
    const reserved = reservedRef.current;

    if (container) observer.observe(container);
    if (content) observer.observe(content);
    if (reserved) observer.observe(reserved);

    document.fonts.addEventListener("loadingdone", run);

    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", run);
    };
  }, []);

  const scale = fit?.scale ?? 1;

  return {
    containerRef,
    contentRef,
    reservedRef,
    scale,
    width: fit?.width,
    height: fit?.height,
    contentStyle: {
      transform: scale < 1 ? `scale(${scale})` : undefined,
      transformOrigin: "top left",
    },
  };
}
