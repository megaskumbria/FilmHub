"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const RESET_MS = 2000;

interface CopyToClipboardMessages {
  success: string;
  error: string;
}

export const useCopyToClipboard = ({ success, error }: CopyToClipboardMessages) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), RESET_MS);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copy = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(success, { position: "bottom-left" });
      return true;
    } catch {
      toast.error(error, { position: "bottom-left" });
      return false;
    }
  };

  return { copied, copy };
};
