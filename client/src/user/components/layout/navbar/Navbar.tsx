import { FiMenu } from "react-icons/fi";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import MobileSearch from "./MobileSearch";

interface Props {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: Props) {
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/10
        bg-[#0B0F19]/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex h-16
          max-w-[1600px]
          items-center
          gap-4
          px-4
          lg:px-6
        "
      >
        {/* Menu Button */}

        <button
          className="
            flex h-10 w-10
            items-center
            justify-center
            rounded-xl
            hover:bg-white/10
            transition
          "
          onClick={onMenuClick}
        >
          <FiMenu size={22} />
        </button>

        <Logo />

        <div className="hidden flex-1 md:flex">
          <SearchBar />
        </div>

        <div className="ml-auto">
          <NavActions />
        </div>
      </div>

      <MobileSearch />
    </header>
  );
}

export default Navbar;