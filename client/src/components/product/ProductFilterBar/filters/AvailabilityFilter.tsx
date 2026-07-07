import FilterDropdown from "../../../common/FilterDropdown";

const availabilityOptions = [
  {
    label: "In Stock",
    value: "true",
  },
];

interface Props {
  selected: string[];
  onApply: (values: string[]) => void;
}

function AvailabilityFilter({
  selected,
  onApply,
}: Props) {
  return (
    <FilterDropdown
      title="Availability"
      items={availabilityOptions}
      selected={selected}
      getLabel={(item) => item.label}
      getValue={(item) => item.value}
      onApply={onApply}
      searchable={false}
    />
  );
}

export default AvailabilityFilter;