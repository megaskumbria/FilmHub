const FAVICON_SIZE = 64;
const TELEGRAM_HOSTS = ["t.me", "telegram.me", "telegram.org"];

const parseHostname = (url: string): string | null => {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const hostname = new URL(href).hostname.replace(/^www\./, "");
    return hostname || null;
  } catch {
    return null;
  }
};

export const getFaviconUrl = (url: string): string | null => {
  const hostname = parseHostname(url);
  if (!hostname) return null;

  return `https://www.google.com/s2/favicons?sz=${FAVICON_SIZE}&domain=${hostname}`;
};

export const getLinkInitials = (url: string): string => {
  const hostname = parseHostname(url);
  if (!hostname) return "?";

  const label = hostname.split(".")[0] ?? "";
  if (label.length >= 2) return label.slice(0, 2).toUpperCase();

  const compact = hostname.replace(/\./g, "");
  return compact.slice(0, 2).toUpperCase() || "?";
};

export const isTelegramUrl = (url: string): boolean => {
  const hostname = parseHostname(url);
  if (!hostname) return false;

  return TELEGRAM_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
};
