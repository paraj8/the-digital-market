import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import SectionHeader from "../../../../components/common/SectionHeader";

import { useCategories } from "../../../../features/categories/hooks/useCategories";
import type { Category } from "../../../../features/categories/types/category";

function MobileCategorySection() {
  const {
    data: categories,
    isLoading,
    error,
  } = useCategories();

  if (isLoading) {
    return (
      <section className="px-4 py-6">
        <SectionHeader
          title="Shop by Category"
          subtitle="Explore our product categories"
        />

        <div
          className="
            flex
            gap-3
            overflow-x-auto
            pb-2
            scrollbar-hide
          "
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="
                min-w-[140px]
                max-w-[140px]
                shrink-0
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#121826]
                animate-pulse
              "
            >
              <div className="aspect-square bg-white/5" />

              <div className="p-3">
                <div className="h-4 w-3/4 rounded bg-white/5" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-6">
        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-4
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
    <section className="px-4 py-6">
      <SectionHeader
        title="Shop by Category"
        subtitle="Explore our product categories"
        actionText="View All"
      />

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-hide
          snap-x
          snap-mandatory
        "
      >
        {activeCategories.map(
          (category: Category) => (
            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
              className="
                group
                min-w-[140px]
                max-w-[140px]
                shrink-0
                snap-start
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#121826]
                transition
                duration-200
                active:scale-[0.98]
              "
            >
              <div className="relative aspect-square overflow-hidden">
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
                      duration-300
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
                      text-xs
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
                    from-black/50
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              <div className="flex items-center justify-between gap-2 p-3">
                <h3
                  className="
                    min-w-0
                    truncate
                    text-sm
                    font-semibold
                    text-white
                    group-hover:text-violet-300
                  "
                >
                  {category.name}
                </h3>

                <FiArrowRight
                  size={14}
                  className="
                    shrink-0
                    text-gray-500
                    transition
                    group-hover:translate-x-0.5
                    group-hover:text-violet-300
                  "
                />
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}

export default MobileCategorySection;