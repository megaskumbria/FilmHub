"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { GoogleIcon } from "@/shared/icons";
import { useGoogleAuth } from "../lib/useAuth";

type GoogleId = {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential: string }) => void;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: { type: "standard"; size: "large"; width: number },
  ) => void;
};

export const ContinueWithGoogle = () => {
  const t = useTranslations("auth");

  const hostRef = useRef<HTMLDivElement>(null);

  const { mutate: googleAuth } = useGoogleAuth();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      const googleId = (window as Window & { google?: { accounts: { id: GoogleId } } }).google
        ?.accounts.id;

      if (!googleId) return;

      googleId.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: (response) => googleAuth(response.credential),
      });

      googleId.renderButton(host, {
        type: "standard",
        size: "large",
        width: host.offsetWidth,
      });
    };

    document.head.appendChild(script);
  }, [googleAuth]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-xs font-medium text-zinc-muted">{t("continueWith")}</span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="relative">
        <div ref={hostRef} className="absolute inset-0 z-10 overflow-hidden opacity-0" />

        <Button variant="social" tabIndex={-1} className="pointer-events-none">
          <GoogleIcon className="size-4.5 shrink-0" />
          <span>Google</span>
        </Button>
      </div>
    </div>
  );
};
