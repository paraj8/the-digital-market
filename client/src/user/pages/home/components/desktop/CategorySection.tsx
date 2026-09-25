import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import SectionHeader from "../../../../components/common/SectionHeader";

import { useCategories } from "../../../../features/categories/hooks/useCategories";
import type { Category } from "../../../../../shared/types/category";

function CategorySection() {
  const {
    data: categories,
    isLoading,
    error,
  } = useCategories();

  if (isLoading) {
    return (
      <section className="px-4 py-6 lg:px-6">
        <SectionHeader
          title="Shop by Category"
          subtitle="Explore our product categories"
        />

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#121826]
                animate-pulse
              "
            >
              <div className="aspect-[4/3] bg-white/5" />

              <div className="space-y-2 p-4">
                <div className="h-4 w-2/3 rounded bg-white/5" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-1/2 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-6 lg:px-6">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-5
            text-sm
            text-red-400
          "
        >
          Failed to load categories
        </div>
      </section>
    );
  }

  const activeCategories =
    categories?.filter(
      (category: Category) => category.isActive
    ) ?? [];

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-6 lg:px-6">
      <SectionHeader
        title="Shop by Category"
        subtitle="Explore our product categories"
        actionText="View All"
      />

      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {activeCategories.map(
          (category: Category) => (
            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#121826]
                transition
                duration-200
                hover:-translate-y-1
                hover:border-violet-500/40
                hover:shadow-lg
                hover:shadow-violet-950/20
              "
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {category.image?.url ? (
                  <img
                    src={category.image.url}
                    alt={category.name}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      bg-gradient-to-br
                      from-violet-600/20
                      via-blue-600/10
                      to-cyan-500/10
                      text-sm
                      text-gray-500
                    "
                  >
                    No Image
                  </div>
                )}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/60
                    via-black/10
                    to-transparent
                  "
                />
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-white
                      transition
                      group-hover:text-violet-300
                      sm:text-base
                    "
                  >
                    {category.name}
                  </h3>

                  {category.description && (
                    <p
                      className="
                        mt-1
                        line-clamp-2
                        text-xs
                        leading-5
                        text-gray-500
                      "
                    >
                      {category.description}
                    </p>
                  )}
                </div>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-gray-400
                    transition
                    group-hover:border-violet-500/30
                    group-hover:bg-violet-500/10
                    group-hover:text-violet-300
                  "
                >
                  <FiArrowRight size={15} />
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}

export default CategorySection;