import FilterDropdown from "../../../common/FilterDropdown";
import type { FilterOptions } from "../../../../types/filter";

interface Props {
  sortOptions: FilterOptions["sortOptions"];
  selected: string[];
  onApply: (values: string[]) => void;
}

function SortFilter({
  sortOptions,
  selected,
  onApply,
}: Props) {
  return (
    <FilterDropdown
      title="Sort"
      items={sortOptions}
      selected={selected}
      getLabel={(item) => item.label}
      getValue={(item) => item.value}
      onApply={onApply}
      searchable={false}
      multiSelect={false}
    />
  );
}

export default SortFilter;