import { useState } from "react";
import { 
  careerPaths, 
  categories, 
  sortOptions, 
  learningResources 
} from "@/mock-data/student/job-recommendations";
import FiltersAndSorting from "./FiltersAndSorting";
import CareerPathCard from "./CareerPathCard";
import LearningResourcesCard from "./LearningResourcesCard";

const JobRecommendationsMain = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("match");

  const filteredPaths = careerPaths
    .filter(path => selectedCategory === "All" || path.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "growth") return a.growth.localeCompare(b.growth);
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Future Career Opportunities
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover career paths aligned with your skills, market trends, and growth potential across UAE emirates
        </p>
      </div>

      {/* Filters */}
      <FiltersAndSorting
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        sortOptions={sortOptions}
      />

      {/* Career Path Cards */}
      <div className="space-y-6">
        {filteredPaths.map((path) => (
          <CareerPathCard key={path.id} careerPath={path} />
        ))}
      </div>

      {/* Learning Resources */}
      <LearningResourcesCard learningResources={learningResources} />
    </div>
  );
};

export default JobRecommendationsMain;
