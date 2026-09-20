interface EmptyMessage {
  title: string;
  text: string | null;
}

export const EMPTY_MESSAGES: Record<"empty" | "search", Record<"own" | "visitor", EmptyMessage>> = {
  empty: {
    own: {
      title: "no films added",
      text: "Browse the catalogue to find something to add",
    },
    visitor: {
      title: "no films added",
      text: "This collection doesn't have any films yet",
    },
  },
  search: {
    own: { title: "no results", text: null },
    visitor: { title: "no results", text: null },
  },
};
