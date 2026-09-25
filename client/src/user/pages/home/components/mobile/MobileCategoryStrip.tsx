import {
  FiCpu,
  FiHeadphones,
  FiPackage,
  FiShoppingBag,
  FiMonitor,
  FiGrid,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { useFilterOptions } from "../../../../features/products/hooks/useFilterOptions";

const categories = [
  {
    name: "Electronics",
    icon: FiCpu,
  },
  {
    name: "Accessories",
    icon: FiHeadphones,
  },
  {
    name: "Packaging",
    icon: FiPackage,
  },
  {
    name: "Fashion",
    icon: FiShoppingBag,
  },
  {
    name: "Computers",
    icon: FiMonitor,
  },
  {
    name: "More",
    icon: FiGrid,
  },
];

function MobileCategoryStrip() {
  const navigate = useNavigate();

  const { data: filterOptions } =
    useFilterOptions();

  const handleCategoryClick = (
    categoryName: string
  ) => {
    if (categoryName === "More") {
      navigate("/products");
      return;
    }

    const category =
      filterOptions?.categories.find(
        (item) =>
          item.name.toLowerCase() ===
          categoryName.toLowerCase()
      );

    if (!category) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?category=${category._id}`
    );
  };

  return (
    <section className="px-4 pb-5">
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
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              onClick={() =>
                handleCategoryClick(
                  category.name
                )
              }
              className="
                flex
                min-w-[92px]
                shrink-0
                snap-start
                flex-col
                items-center
                gap-2
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-3
                py-4
                text-center
                transition
                active:scale-95
                active:bg-white/10
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/5
                  text-gray-300
                "
              >
                <Icon size={22} />
              </div>

              <span
                className="
                  whitespace-nowrap
                  text-xs
                  font-medium
                  text-gray-300
                "
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default MobileCategoryStrip;