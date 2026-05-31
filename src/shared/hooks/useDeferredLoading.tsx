import { useState, useEffect } from "react";

export const useDeferredLoading = (isLoading: boolean, delay = 250) => {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowSkeleton(false);
      return;
    }

    const timer = setTimeout(() => setShowSkeleton(true), delay);
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showSkeleton;
};
