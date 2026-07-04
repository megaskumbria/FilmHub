import { ZoneBlock, Zones } from "../lib/types";

const BLOCKS: ZoneBlock[] = [
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "genres", label: "Genres" },
  {
    id: "flags",
    label: "Flags",
    subOptions: [{ id: "showCategories", label: "Categories", storeKey: "showCategories" }],
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
        subOptions: [{ id: "showCategories", label: "Categories", storeKey: "showCategories" }],
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
        subOptions: [{ id: "showCategories", label: "Categories", storeKey: "showCategories" }],
      },
    ],
  },
];
