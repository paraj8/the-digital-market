import FilterDropdown from "../../../common/FilterDropdown";

interface Props {
  brands: string[];
  selected: string[];
  onApply: (values: string[]) => void;
}

function BrandFilter({
  brands,
  selected,
  onApply,
}: Props) {
  return (
    <FilterDropdown
      title="Brand"
      items={brands}
      selected={selected}
      getLabel={(item) => item}
      getValue={(item) => item}
      onApply={onApply}
    />
  );
}

export default BrandFilter;