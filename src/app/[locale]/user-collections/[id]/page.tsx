"use client";

import { UserProfileHeader } from "@/widgets";
import { UserCollections } from "@/widgets/user-collections";
import { useState } from "react";

export default function UserCollectionPage() {
  const [activeFolder, setActiveFolder] = useState(0);

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <UserProfileHeader />

      <UserCollections
        isMyProfile={false}
        setActiveFolder={setActiveFolder}
        activeFolder={activeFolder}
      />
    </div>
  );
}
