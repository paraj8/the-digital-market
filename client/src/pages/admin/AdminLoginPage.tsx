import { useState } from "react";
import { Link } from "react-router-dom";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // TODO:
    // Connect admin login API
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md

          rounded-2xl

          border
          border-white/10

          bg-slate-900/70

          backdrop-blur-xl

          p-8

          shadow-2xl
        "
      >
        {/* Logo */}

        <div className="text-center">
          <h1
            className="
              text-3xl
              font-bold
              text-violet-400
            "
          >
            The Digital Market
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-gray-400
            "
          >
            Admin / Staff Portal
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-gray-300
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="admin@example.com"
              className="
                w-full

                rounded-xl

                border
                border-white/10

                bg-slate-800

                px-4
                py-3

                text-white

                outline-none

                transition

                focus:border-violet-500
              "
            />
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-gray-300
              "
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              className="
                w-full

                rounded-xl

                border
                border-white/10

                bg-slate-800

                px-4
                py-3

                text-white

                outline-none

                transition

                focus:border-violet-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full

              rounded-xl

              bg-violet-600

              py-3

              font-semibold

              transition

              hover:bg-violet-500
            "
          >
            Login
          </button>
        </form>

        <div
          className="
            mt-6
            text-center
            text-sm
            text-gray-400
          "
        >
          Customer?

          <Link
            to="/login"
            className="
              ml-2

              text-violet-400

              hover:underline
            "
          >
            Customer Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;