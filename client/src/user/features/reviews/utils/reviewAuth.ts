export const getStoredUserId = (): string | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }

    const user = JSON.parse(storedUser) as { id?: string; _id?: string };
    return user._id ?? user.id ?? null;
  } catch {
    return null;
  }
};
