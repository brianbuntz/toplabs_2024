// pages/category/[categoryId]/index.tsx

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import topLabsData from '../../../data/top_labs.json';
import OrganizationCard from '../../../components/OrganizationCard';
import EnhancedNavBar from '../../../components/EnhancedNavBar';

type Organization = {
  id: string;
  name: string;
  description?: string;
  heroImage?: {
    url: string;
    altText: string;
  };
  isFeatured?: boolean;
};

type ResearchCategory = {
  id: string;
  name: string;
  heroImage: {
    url: string;
    altText: string;
  };
  organizations: Organization[];
};

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  if (!categoryId) return <div>Loading...</div>;

  const category: ResearchCategory | undefined = topLabsData.researchCategories.find(
    (cat) => cat.id === categoryId
  );

  if (!category) return <div>Category not found</div>;

  const featuredOrg = category.organizations.find(org => org.isFeatured);
  const regularOrgs = category.organizations.filter(org => !org.isFeatured);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: category.name, href: `/category/${category.id}` },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{category.name} - Top Labs</title>
        <meta name="description" content={`Explore organizations under ${category.name}.`} />
      </Head>
      <main className="flex-grow container mx-auto px-4 py-8">
        <EnhancedNavBar 
          items={breadcrumbItems} 
          imageSrc={category.heroImage.url} 
        />
        <h1 className="text-3xl font-bold mb-6">{category.name} Organizations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOrg && (
            <div className="col-span-full mb-6">
              <OrganizationCard organization={featuredOrg} categoryId={category.id} isFeatured={true} />
            </div>
          )}
          {regularOrgs.map((org) => (
            <OrganizationCard key={org.id} organization={org} categoryId={category.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;