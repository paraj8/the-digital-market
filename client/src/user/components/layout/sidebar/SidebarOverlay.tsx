interface Props {
  open: boolean;
  onClose: () => void;
}

function SidebarOverlay({
  open,
  onClose,
}: Props) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-40
        bg-black/50
        backdrop-blur-sm
        transition-opacity duration-300

        ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
    />
  );
}

export default SidebarOverlay;