import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TodoFiltersProps {
  setSortType: (value: string) => void;
  setStateFilter: (value: string) => void;
  setGroupBy: (value: string) => void;
  sortType: string;
  stateFilter: string;
  groupBy: string;
}

export default function TodoFilters({
  setSortType,
  setStateFilter,
  setGroupBy,
  sortType,
  stateFilter,
  groupBy,
}: TodoFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select onValueChange={setSortType} defaultValue={sortType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Sort by Date</SelectItem>
          <SelectItem value="state">Sort by State</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setStateFilter} defaultValue={stateFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setGroupBy} defaultValue={groupBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="group by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Grouping</SelectItem>
          <SelectItem value="state">Group by State</SelectItem>
          <SelectItem value="date">Group by Date</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
