import FilterDropdown from "../../../common/FilterDropdown";

interface Props {
  ratings: number[];
  selected: string[];
  onApply: (values: string[]) => void;
}

function RatingFilter({
  ratings,
  selected,
  onApply,
}: Props) {
  return (
    <FilterDropdown
      title="Rating"
      items={ratings}
      selected={selected}
      getLabel={(item) => `${item} ★ & up`}
      getValue={(item) => item.toString()}
      onApply={onApply}
      searchable={false}
    />
  );
}

export default RatingFilter;