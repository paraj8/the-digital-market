const wishlistService = require(
  "./wishlist_service"
);

// Add Product To Wishlist
const addToWishlist = async (
  req,
  res
) => {
  try {
    const wishlist =
      await wishlistService.addToWishlist(
        req.user.id,
        req.body.productId
      );

    res.status(201).json({
      success: true,
      message:
        "Product added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product From Wishlist
const removeFromWishlist = async (
  req,
  res
) => {
  try {
    const result =
      await wishlistService.removeFromWishlist(
        req.user.id,
        req.params.productId
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Wishlist
const getWishlist = async (
  req,
  res
) => {
  try {
    const wishlist =
      await wishlistService.getWishlist(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};