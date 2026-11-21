import { ZoneBlock, ZoneBlockSubOption, Zones } from "../lib/types";

const FLAG_SUB_OPTIONS: ZoneBlockSubOption[] = [
  { id: "scales", label: "Scales", storeKey: "showScales" },
  { id: "levels", label: "Levels", storeKey: "showLevelDots" },
];

const BLOCKS: ZoneBlock[] = [
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "genres", label: "Genres" },
  {
    id: "flags",
    label: "Flags",
    subOptions: FLAG_SUB_OPTIONS,
  },
  { id: "rating", label: "Rating" },
];

export const ZONES: Zones[] = [
  {
    key: "poster",
    label: "POSTER",
    dotClass: "bg-blue-400",
    blocks: BLOCKS,
  },
  {
    key: "hover",
    label: "HOVER",
    dotClass: "bg-accent",
    blocks: [
      { id: "title", label: "Title" },
      { id: "description", label: "Description" },
      { id: "genres", label: "Genres" },
      {
        id: "flags",
        label: "Flags",
        subOptions: FLAG_SUB_OPTIONS,
      },
    ],
  },
  {
    key: "body",
    label: "BODY",
    dotClass: "bg-emerald-accent",
    blocks: [
      { id: "title", label: "Title" },
      { id: "description", label: "Description" },
      { id: "genres", label: "Genres" },
      {
        id: "flags",
        label: "Flags",
        subOptions: FLAG_SUB_OPTIONS,
      },
    ],
  },
];
