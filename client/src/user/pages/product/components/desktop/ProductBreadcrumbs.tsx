interface ProductBreadcrumbsProps {
  title: string;
}

function ProductBreadcrumbs({
  title,
}: ProductBreadcrumbsProps) {
  return (
    <div className="mb-4 text-sm text-slate-400">
      Home /
      <span className="mx-2">
        Products
      </span>
      /
      <span className="ml-2 text-white">
        {title}
      </span>
    </div>
  );
}

export default ProductBreadcrumbs;
