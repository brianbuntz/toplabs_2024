// pages/category/[categoryId]/organization/[organizationId].tsx
import React from 'react';
import { useRouter } from 'next/router';
import topLabsData from '../../../../data/top_labs.json';
import OrganizationCard from '../../../../components/OrganizationCard';
import Image from 'next/image';
import Head from 'next/head';

type Organization = {
  id: string;
  name: string;
  description?: string;
  heroImage?: {
    url: string;
    altText: string;
  };
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

const OrganizationPage: React.FC = () => {
  const router = useRouter();
  const { categoryId, organizationId } = router.query;

  if (!categoryId || !organizationId) return <div>Loading...</div>;

  const category: ResearchCategory | undefined = topLabsData.researchCategories.find(
    (cat) => cat.id === categoryId
  );

  if (!category) return <div>Category not found</div>;

  const organization: Organization | undefined = category.organizations.find((org) => org.id === organizationId);

  if (!organization) return <div>Organization not found</div>;

  return (
    <>
      <Head>
        <title>{organization.name} - {category.name} - Top Labs</title>
        <meta name="description" content={`Explore details of ${organization.name} in ${category.name}.`} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          {organization.heroImage && (
            <div className="mb-6 w-1/2 mx-auto">
              <Image
                src={organization.heroImage.url || '/default-icon.png'}
                alt={organization.heroImage.altText || organization.name}
                width={200}
                height={200}
                className="object-contain rounded-full mx-auto"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4 text-center">{organization.name}</h1>
          {organization.description && (
            <p className="text-center mb-6 max-w-2xl">{organization.description}</p>
          )}
        </div>

        <h2 className="text-2xl font-semibold text-center mt-12 mb-6">Other Organizations in {category.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.organizations.filter(org => org.id !== organizationId).map((org) => (
            <OrganizationCard key={org.id} organization={org} categoryId={category.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OrganizationPage;