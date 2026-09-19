export type TabValue = "followers" | "following";

interface Tab {
  value: TabValue;
  label: string;
}

export const TABS: Tab[] = [
  { value: "followers", label: "Followers" },
  { value: "following", label: "Following" },
];
