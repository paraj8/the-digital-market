import SidebarOverlay from "./SidebarOverlay";
import SidebarContent from "./SidebarContent";

interface Props {
  open: boolean;
  onClose: () => void;
}

function Sidebar({
  open,
  onClose,
}: Props) {
  return (
    <>
      <SidebarOverlay
        open={open}
        onClose={onClose}
      />

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[300px]
          bg-[#111827]
          border-r border-white/10
          shadow-2xl

          transition-transform duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

export default Sidebar;