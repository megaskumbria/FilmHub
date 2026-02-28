import { IZoneBlock, IZones } from "../lib/types";

const BLOCKS: IZoneBlock[] = [
  { id: "title", label: "Название" },
  { id: "description", label: "Описание" },
  { id: "genres", label: "Жанры" },
  {
    id: "flags",
    label: "Флаги",
    subOptions: [{ id: "showCategories", label: "Категории", storeKey: "showCategories" }],
  },
  { id: "rating", label: "Рейтинг" },
];

export const ZONES: IZones[] = [
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
    blocks: BLOCKS,
  },
  {
    key: "body",
    label: "BODY",
    dotClass: "bg-emerald-accent",
    blocks: [
      { id: "title", label: "Название" },
      { id: "description", label: "Описание" },
      { id: "genres", label: "Жанры" },
      {
        id: "flags",
        label: "Флаги",
        subOptions: [{ id: "showCategories", label: "Категории", storeKey: "showCategories" }],
      },
    ],
  },
];
