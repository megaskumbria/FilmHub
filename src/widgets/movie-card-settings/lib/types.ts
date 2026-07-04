import { BlockKey } from "@/shared/types/movie-card-blocks";

export interface ZoneBlockSubOption {
  id: string;
  label: string;
  storeKey: string;
}

export interface ZoneBlock {
  id: BlockKey;
  label: string;
  subOptions?: ZoneBlockSubOption[];
}

export interface Zones {
  key: ZoneKey;
  label: string;
  dotClass: string;
  blocks: ZoneBlock[];
}

export type ZoneKey = "poster" | "hover" | "body";

export type SelectedSettings = Record<ZoneKey, string[]>;
