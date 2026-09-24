const GUEST_ID_KEY = "guest_id";

export const getGuestId = (): string => {
  if (typeof window === "undefined") return "";

  const existingId = localStorage.getItem(GUEST_ID_KEY);
  if (existingId) return existingId;

  const guestId = crypto.randomUUID();
  localStorage.setItem(GUEST_ID_KEY, guestId);

  return guestId;
};
