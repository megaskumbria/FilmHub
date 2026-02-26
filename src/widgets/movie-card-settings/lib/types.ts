export interface IZoneBlock {
  id: string;
  label: string;
}

export interface IZones {
  key: ZoneKey;
  label: string;
  dotClass: string;
}

export type ZoneKey = "poster" | "hover" | "body";

export type SelectedSettings = Record<ZoneKey, string[]>;
