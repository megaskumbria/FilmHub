export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;
const API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";

// Cache by full stylesheet URL so updates to weight/subset params re-fetch once per session.
const loadedStylesheetHrefs = new Set<string>();

/** Weights used across the app (FlagBadge font-semibold ≈600, previews font-bold ≈700). */
const FONT_FACE_WEIGHTS = "400;600;700";

// Cache for the Google Fonts API response
let fontsCache: GoogleFont[] | null = null;
let fontsCacheTimestamp: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  // Check if we have a valid cache
  if (fontsCache && fontsCacheTimestamp && Date.now() - fontsCacheTimestamp < CACHE_DURATION) {
    return fontsCache;
  }

  if (!API_KEY) {
    throw new Error("Google Fonts API key is not configured");
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&sort=popularity`);
    if (!response.ok) {
      throw new Error("Failed to fetch Google Fonts");
    }
    const data = await response.json();
    fontsCache = data.items;
    fontsCacheTimestamp = Date.now();
    return data.items;
  } catch (error) {
    // If fetch fails and we have a cache, return it even if expired
    if (fontsCache) {
      return fontsCache;
    }
    console.error("Error fetching Google Fonts:", error);
    throw error;
  }
}

export function getFontUrl(font: GoogleFont, variant = "regular"): string {
  const fontFamily = font.family.replace(/\s+/g, "+");
  const fontVariant = variant === "regular" ? FONT_FACE_WEIGHTS : variant;
  return `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontVariant}&display=swap`;
}

function getFontStylesheetHref(fontFamily: string): string {
  const encoded = fontFamily.trim().replace(/\s+/g, "+");
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@${FONT_FACE_WEIGHTS}&display=swap`;
}

export async function loadFont(fontFamily: string): Promise<void> {
  const href = getFontStylesheetHref(fontFamily);
  if (loadedStylesheetHrefs.has(href)) {
    return;
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = href;
    link.rel = "stylesheet";

    link.onload = () => {
      loadedStylesheetHrefs.add(href);
      resolve();
    };

    link.onerror = () => {
      reject(new Error(`Failed to load font: ${fontFamily}`));
    };

    document.head.appendChild(link);
  });
}

export function fontSupportsCyrillic(font: GoogleFont): boolean {
  return font.subsets.includes("cyrillic") || font.subsets.includes("cyrillic-ext");
}

export interface FontPickerProps {
  onFontSelect?: (font: GoogleFont) => void;
  value?: string;
}

export const FONT_CATEGORIES = [
  "serif",
  "sans-serif",
  "display",
  "handwriting",
  "monospace",
] as const;

export type FontCategory = (typeof FONT_CATEGORIES)[number];

export const FONT_WEIGHTS = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

export type FontWeight = (typeof FONT_WEIGHTS)[number];
