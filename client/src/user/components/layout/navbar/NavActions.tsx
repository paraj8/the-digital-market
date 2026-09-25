import { useState } from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import ProfileDropdown from "./ProfileDropdown";

function NavActions() {
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") ||
      "null"
  );

  return (
    <div className="flex items-center gap-2">
      {/* Wishlist */}

      <button
        onClick={() =>
          navigate("/wishlist")
        }
        className="
          hidden sm:flex
          h-10 w-10
          items-center
          justify-center
          rounded-xl
          hover:bg-white/10
          transition
        "
      >
        <FiHeart size={20} />
      </button>

      {/* Cart */}

      <button
        onClick={() =>
          navigate("/cart")
        }
        className="
          relative
          flex h-10 w-10
          items-center
          justify-center
          rounded-xl
          hover:bg-white/10
          transition
        "
      >
        <FiShoppingCart size={20} />

        <span
          className="
            absolute
            -right-1
            -top-1
            flex h-5 w-5
            items-center
            justify-center
            rounded-full
            bg-violet-600
            text-xs
          "
        >
          0
        </span>
      </button>

      {/* User */}

      <div className="relative">
        {token && user ? (
          <>
            <button
              onClick={() =>
                setOpen(!open)
              }
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
                onClose={() =>
                  setOpen(false)
                }
              />
            )}
          </>
        ) : (
          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              flex h-10 w-10
              items-center
              justify-center
              rounded-xl
              hover:bg-white/10
              transition
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