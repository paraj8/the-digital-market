
import { useState } from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import ProfileDropdown from "./ProfileDropdown";

import { useCart } from "../../../features/cart/hooks/useCart";
import { useWishlist } from "../../../features/wishlist/hooks/useWishlist";

function NavActions() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isLoggedIn = Boolean(token && user);

  const { data: cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart?.totalItems ?? 0;
  const wishlistCount = wishlist.length;

  return (
    <div className="flex items-center gap-2">
      {/* Wishlist */}

      <button
        onClick={() => navigate("/wishlist")}
        className="
          relative
          hidden
          h-10 w-10
          items-center
          justify-center
          rounded-xl
          transition
          hover:bg-white/10
          sm:flex
        "
      >
        <FiHeart size={20} />

        {isLoggedIn && wishlistCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              min-h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-violet-600
              px-1
              text-[10px]
              font-semibold
              leading-none
              text-white
            "
          >
            {wishlistCount > 99
              ? "99+"
              : wishlistCount}
          </span>
        )}
      </button>

      {/* Cart */}

      <button
        onClick={() => navigate("/cart")}
        className="
          relative
          flex
          h-10 w-10
          items-center
          justify-center
          rounded-xl
          transition
          hover:bg-white/10
        "
      >
        <FiShoppingCart size={20} />

        {isLoggedIn && cartCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              min-h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-violet-600
              px-1
              text-[10px]
              font-semibold
              leading-none
              text-white
            "
          >
            {cartCount > 99
              ? "99+"
              : cartCount}
          </span>
        )}
      </button>

      {/* User */}

      <div className="relative">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                text-sm
                font-bold
                text-white
                transition
                hover:scale-105
              "
            >
              {user.fullName?.[0]?.toUpperCase()}
            </button>

            {open && (
              <ProfileDropdown
                user={user}
                onClose={() => setOpen(false)}
              />
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="
              flex
              h-10 w-10
              items-center
              justify-center
              rounded-xl
              transition
              hover:bg-white/10
            "
          >
            <FiUser size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default NavActions;

