interface MobileProductBreadcrumbsProps {
  title: string;
}

function MobileProductBreadcrumbs({
  title,
}: MobileProductBreadcrumbsProps) {
  return (
    <nav className="mb-4 text-xs text-slate-400" aria-label="Breadcrumb">
      <span>Home</span>
      <span className="mx-1.5">/</span>
      <span>Products</span>
      <span className="mx-1.5">/</span>
      <span className="text-white">{title}</span>
    </nav>
  );
}

export default MobileProductBreadcrumbs;
