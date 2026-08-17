import { useState } from "react";
import {
  FiSave,
  FiLock,
  FiBell,
  FiShield,
  FiMail,
  FiUser,
} from "react-icons/fi";

function AdminSettingsPage() {
  const [storeName, setStoreName] =
    useState("The Digital Market");

  const [email, setEmail] =
    useState("admin@thedigitalmarket.com");

  const [phone, setPhone] =
    useState("");

  const [orderNotifications, setOrderNotifications] =
    useState(true);

  const [customerNotifications, setCustomerNotifications] =
    useState(true);

  const [marketingNotifications, setMarketingNotifications] =
    useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      storeName,
      email,
      phone,
      orderNotifications,
      customerNotifications,
      marketingNotifications,
    });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Manage your admin panel and store settings.
        </p>
      </div>

      {/* SETTINGS NAV */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">

        {/* SIDEBAR */}

        <div className="h-fit rounded-2xl border border-white/10 bg-slate-900/60 p-3">

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              bg-violet-600/15
              px-4
              py-3
              text-left
              text-sm
              font-medium
              text-violet-400
            "
          >
            <FiUser size={18} />

            General
          </button>

          <button
            type="button"
            className="
              mt-1
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-sm
              text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            <FiBell size={18} />

            Notifications
          </button>

          <button
            type="button"
            className="
              mt-1
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-sm
              text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            <FiShield size={18} />

            Security
          </button>

        </div>

        {/* CONTENT */}

        <div className="space-y-6">

          {/* GENERAL SETTINGS */}

          <form
            onSubmit={handleSave}
            className="
              rounded-2xl
              border
              border-white/10
              bg-slate-900/60
            "
          >

            <div className="border-b border-white/10 p-6">

              <h2 className="text-lg font-semibold text-white">
                General Settings
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Update basic information about your store.
              </p>

            </div>

            <div className="space-y-5 p-6">

              {/* STORE NAME */}

              <div>

                <label className="mb-2 block text-sm text-gray-300">
                  Store Name
                </label>

                <input
                  type="text"
                  value={storeName}
                  onChange={(e) =>
                    setStoreName(e.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-slate-800/70
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    focus:border-violet-500
                  "
                />

              </div>

              {/* ADMIN EMAIL */}

              <div>

                <label className="mb-2 block text-sm text-gray-300">
                  Admin Email
                </label>

                <div className="relative">

                  <FiMail
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-800/70
                      py-3
                      pl-10
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      focus:border-violet-500
                    "
                  />

                </div>

              </div>

              {/* PHONE */}

              <div>

                <label className="mb-2 block text-sm text-gray-300">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-slate-800/70
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-gray-600
                    focus:border-violet-500
                  "
                />

              </div>

            </div>

            {/* SAVE */}

            <div className="flex justify-end border-t border-white/10 p-6">

              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-violet-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-violet-500
                "
              >
                <FiSave size={17} />

                Save Changes
              </button>

            </div>

          </form>

          {/* NOTIFICATIONS */}

          <div className="rounded-2xl border border-white/10 bg-slate-900/60">

            <div className="border-b border-white/10 p-6">

              <h2 className="text-lg font-semibold text-white">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Choose which notifications you want to receive.
              </p>

            </div>

            <div className="divide-y divide-white/5">

              {/* ORDERS */}

              <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                    <FiBell size={18} />
                  </div>

                  <div>

                    <p className="font-medium text-white">
                      New Orders
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Notify when a new order is placed.
                    </p>

                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={orderNotifications}
                  onChange={(e) =>
                    setOrderNotifications(
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 accent-violet-600"
                />

              </label>

              {/* CUSTOMERS */}

              <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <FiUser size={18} />
                  </div>

                  <div>

                    <p className="font-medium text-white">
                      Customer Activity
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Notify about important customer activity.
                    </p>

                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={customerNotifications}
                  onChange={(e) =>
                    setCustomerNotifications(
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 accent-violet-600"
                />

              </label>

              {/* MARKETING */}

              <label className="flex cursor-pointer items-center justify-between gap-4 p-6">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                    <FiMail size={18} />
                  </div>

                  <div>

                    <p className="font-medium text-white">
                      Marketing Updates
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Receive promotional and marketing emails.
                    </p>

                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={marketingNotifications}
                  onChange={(e) =>
                    setMarketingNotifications(
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 accent-violet-600"
                />

              </label>

            </div>

          </div>

          {/* SECURITY */}

          <div className="rounded-2xl border border-white/10 bg-slate-900/60">

            <div className="border-b border-white/10 p-6">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
                  <FiLock size={19} />
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    Security
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Manage your administrator account security.
                  </p>

                </div>

              </div>

            </div>

            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="font-medium text-white">
                  Change Password
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Update your admin account password.
                </p>

              </div>

              <button
                type="button"
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-800
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-gray-300
                  transition
                  hover:border-violet-500/40
                  hover:text-white
                "
              >
                Change Password
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminSettingsPage;