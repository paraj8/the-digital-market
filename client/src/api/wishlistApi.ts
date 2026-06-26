import api from "./axios";

// Get Wishlist
export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data.data;
};

// Add To Wishlist
export const addToWishlist = async (
  productId: string
) => {
  const response = await api.post(
    "/wishlist",
    {
      productId,
    }
  );

  return response.data.data;
};

// Remove From Wishlist
export const removeFromWishlist = async (
  productId: string
) => {
  const response =
    await api.delete(
      `/wishlist/${productId}`
    );

  return response.data.data;
};