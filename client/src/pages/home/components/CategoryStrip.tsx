import {
  FiCpu,
  FiHeadphones,
  FiPackage,
  FiShoppingBag,
  FiMonitor,
  FiGrid,
} from "react-icons/fi";

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

function CategoryStrip() {
  return (
    <section className="px-4 pb-6 lg:px-6">
      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-3
          lg:grid-cols-6
        "
      >
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-5
                transition
                hover:border-violet-500/50
                hover:bg-white/10
              "
            >
              <div className="flex flex-col items-center gap-3">
                <Icon size={28} />

                <span className="font-medium">
                  {category.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryStrip;