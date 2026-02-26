"use client";

import { ZonesPanel } from "./ZonesPanel";
import { CardPreview } from "./CardPreview";
import { useState } from "react";
import { SelectedSettings, ZoneKey } from "../lib/types";

const selectedSettings: SelectedSettings = { poster: [], hover: [], body: [] };

export const CardSettings = () => {
  const [checked, setChecked] = useState<SelectedSettings>(selectedSettings);

  const handleChecked = (zone: ZoneKey, blockId: string) => {
    setChecked((prev) => ({
      ...prev,
      [zone]: [...prev[zone], blockId],
    }));
  };

  return (
    <>
      <ZonesPanel checked={checked} handleChecked={handleChecked} />
      <CardPreview />
    </>
  );
};
