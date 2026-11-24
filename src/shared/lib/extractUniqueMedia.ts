import { InfiniteData } from "@tanstack/react-query";
import { MediaPage } from "../hooks/useMedia";

export const extractUniqueMedia = (dataMedia: InfiniteData<MediaPage> | undefined) => {
  const allMediaRaw = dataMedia?.pages.flatMap((page) => page.media) ?? [];
  const allMedia = Array.from(new Map(allMediaRaw.map((m) => [m.id, m])).values());
  return allMedia;
};
