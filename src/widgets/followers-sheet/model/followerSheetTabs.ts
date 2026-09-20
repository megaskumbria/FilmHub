export type TabValue = "followers" | "following";

interface Tab {
  value: TabValue;
  label: string;
}

export const TABS: Tab[] = [
  { value: "followers", label: "Followers" },
  { value: "following", label: "Following" },
];

export const EMPTY_MESSAGES: Record<TabValue | "search", string> = {
  search: "No one matches that search",
  followers: "No followers yet",
  following: "Not following anyone yet",
};
