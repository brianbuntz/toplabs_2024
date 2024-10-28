// pages/category/[categoryId]/index.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import topLabsDataRaw from "../../../data/topLabsNew.json";
import OrganizationCard from "../../../components/OrganizationCard";
import EnhancedNavBar from "../../../components/EnhancedNavBar";
import { ResearchCategory, TopLabsData, Organization } from "../../../types";
import { motion, AnimatePresence } from "framer-motion";

// Cast raw data to the appropriate type
const topLabsData: TopLabsData = topLabsDataRaw as unknown as TopLabsData;

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [showAll, setShowAll] = useState(false);

  const currentCategoryId = React.useMemo(() => {
    if (Array.isArray(categoryId)) {
      return categoryId[0];
    }
    return categoryId;
  }, [categoryId]);

  // Early return for loading and validation
  if (!router.isReady) return <div>Loading...</div>;
  if (!currentCategoryId) return <div>Invalid category ID.</div>;

  const category: ResearchCategory | undefined =
    topLabsData.researchCategories.find((cat) => cat.id === currentCategoryId);

  if (!category) return <div>Category not found</div>;

  const getOrganization = (orgId: string): Organization | undefined => {
    return topLabsData.organizations.find((org) => org.id === orgId);
  };

  const featuredOrgId = category.organizations.find((orgId) => {
    const org = getOrganization(orgId);
    return org?.isFeatured;
  });

  const regularOrgIds = category.organizations.filter((orgId) => {
    const org = getOrganization(orgId);
    return !org?.isFeatured;
  });

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const displayedOrgIds = showAll ? regularOrgIds : regularOrgIds.slice(0, 6);
  const hasMore = regularOrgIds.length > 6;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: category.name, href: `/category/${category.id}` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      <Head>
        <title>{category.name} - Top Labs</title>
        <meta
          name="description"
          content={`Explore organizations under ${category.name}.`}
        />
      </Head>
      {category.heroImage && (
        <EnhancedNavBar
          items={breadcrumbItems}
          imageSrc={category.heroImage.url}
        />
      )}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">
          {category.name} Organizations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOrgId && (
            <div className="col-span-full mb-4">
              {(() => {
                const featuredOrg = getOrganization(featuredOrgId);
                return featuredOrg ? (
                  <OrganizationCard
                    organization={featuredOrg}
                    categoryId={category.id}
                    featured={true}
                  />
                ) : null;
              })()}
            </div>
          )}
          <AnimatePresence>
            {displayedOrgIds.map((orgId) => {
              const org = getOrganization(orgId);
              if (!org) return null;
              return (
                <motion.div
                  key={orgId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <OrganizationCard
                    organization={org}
                    categoryId={category.id}
                    size="normal"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={toggleShowAll}
              className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-full hover:from-gray-700 hover:to-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {showAll ? "Show Less" : "Show All"}
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                  showAll ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
