import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { SortOption } from "@/types/student/job-recommendations";

interface FiltersAndSortingProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
  sortOptions: SortOption[];
}

const FiltersAndSorting = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  sortOptions
}: FiltersAndSortingProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltersAndSorting;
