import { BlockKey } from "@/shared/types/movie-card-blocks";

export interface IZoneBlockSubOption {
  id: string;
  label: string;
  storeKey: string;
}

export interface IZoneBlock {
  id: BlockKey;
  label: string;
  subOptions?: IZoneBlockSubOption[];
}

export interface IZones {
  key: ZoneKey;
  label: string;
  dotClass: string;
  blocks: IZoneBlock[];
}

export type ZoneKey = "poster" | "hover" | "body";

export type SelectedSettings = Record<ZoneKey, string[]>;
