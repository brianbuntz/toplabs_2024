// pages/category/index.tsx
import React from "react";
import Head from "next/head";
import EnhancedNavBar from "../../components/EnhancedNavBar";
import CategoryCard from "../../components/CategoryCard";
import topLabsDataImport from "../../data/topLabsNew.json";
import { TopLabsData, ResearchCategory, Organization } from "../../types";

const topLabsData: TopLabsData = topLabsDataImport as unknown as TopLabsData;

const CategoriesPage: React.FC = () => {
  const categories: ResearchCategory[] = topLabsData.researchCategories;

  // New: Define getOrganization function
  const getOrganization = (orgId: string): Organization | undefined => {
    return topLabsData.organizations.find((org) => org.id === orgId);
  };

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/category" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      <Head>
        <title>Categories - Top Labs</title>
        <meta
          name="description"
          content="Explore various research categories at Top Labs."
        />
      </Head>
      <EnhancedNavBar items={breadcrumbItems} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Research Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: ResearchCategory) => (
            <CategoryCard
              key={category.id}
              category={category}
              getOrganization={getOrganization} // Changed: Pass getOrganization as prop
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
