import FilterDropdown from "../../../common/FilterDropdown";
import type { FilterOptions } from "../../../../types/filter";

interface Props {
  categories: FilterOptions["categories"];
  selected: string[];
  onApply: (values: string[]) => void;
}

function CategoryFilter({
  categories,
  selected,
  onApply,
}: Props) {
  return (
    <FilterDropdown
      title="Categories"
      items={categories}
      selected={selected}
      getLabel={(item) => item.name}
      getValue={(item) => item._id}
      onApply={onApply}
    />
  );
}

export default CategoryFilter;