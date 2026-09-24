interface Args {
  userId: string;
  collectionId: string;
}

export const getCollectionShareUrl = ({ userId, collectionId }: Args): string => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return `${origin}/collections/${userId}?collectionId=${collectionId}`;
};
