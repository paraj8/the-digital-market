const Wishlist = require("./wishlist_model");
const Product = require("../products/products_model");
const User = require("../users/users_model");

// Add Product To Wishlist
const addToWishlist = async (
  userId,
  productId
) => {
  const product =
    await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const existingWishlist =
    await Wishlist.findOne({
      user: userId,
      product: productId,
    });

  if (existingWishlist) {
    throw new Error(
      "Product already in wishlist"
    );
  }

  const wishlist =
    await Wishlist.create({
      user: userId,
      product: productId,
    });

  await User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        wishlistCount: 1,
      },
    }
  );

  return wishlist;
};

// Remove Product From Wishlist
const removeFromWishlist = async (
  userId,
  productId
) => {
  const wishlist =
    await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

  if (!wishlist) {
    throw new Error(
      "Product not found in wishlist"
    );
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        wishlistCount: -1,
      },
    }
  );

  return {
    message:
      "Product removed from wishlist",
  };
};

// Get User Wishlist
const getWishlist = async (
  userId
) => {
  return await Wishlist.find({
    user: userId,
  })
    .populate("product")
    .sort({
      createdAt: -1,
    });
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};