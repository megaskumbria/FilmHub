import { InfiniteData } from "@tanstack/react-query";
import { IMediaData } from "../stores/movie-catalog";

export const extractUniqueMedia = (dataMedia: InfiniteData<IMediaData> | undefined) => {
  const allMediaRaw = dataMedia?.pages.flatMap((page) => page.media) ?? [];
  const allMedia = Array.from(new Map(allMediaRaw.map((m) => [m.id, m])).values());
  return allMedia;
};
