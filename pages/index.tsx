// pages/index.tsx
import React from "react";
import CategoryCard from "../components/CategoryCard";
import topLabsData from "../data/top_labs.json";

type ResearchCategory = {
  id: string;
  name: string;
  heroImage: {
    url: string;
    altText: string;
  };
  // Other fields omitted for brevity
};

const Home: React.FC = () => {
  const categories: ResearchCategory[] = topLabsData.researchCategories;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-left mb-8">
          Explore Labs by Domain
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
