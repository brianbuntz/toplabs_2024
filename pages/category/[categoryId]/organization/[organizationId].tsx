// pages/category/[categoryId]/organization/[organizationId].tsx

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { ArrowRight, Clock, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import EnhancedNavBar from "../../../../components/EnhancedNavBar";
import Card from "../../../../components/Card";
import InfoItem from "../../../../components/InfoItem";
import AwardsExplorer from "../../../../components/AwardsExplorer";
import ResponsiveVideo from "../../../../components/ResponsiveVideo";
import FeaturedContentSlideshow from "../../../../components/FeaturedContentSlideshow";
import RelatedContentSlideshow from "../../../../components/RelatedContentSlideshow";

import topLabsDataImport from "../../../../data/topLabsNew.json";
import mapDataImport from "../../../../data/map.json";
import searchRDProfiles from "../../../../data/searchRDProfiles.json";

import { TopLabsData, Organization, RD100Award } from "../../../../types";
import {
  MapData,
  CompanyFeature,
  SubsidiaryFeature,
  MapFeatureUnion,
} from "../../../../types/map";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Bar,
} from "recharts";

import { Feature } from "geojson";

interface SearchRDProfile {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  website: string;
  profile_link: string;
  RD100Awards: RD100Award[];
  categories: string;
}

const DynamicMap = dynamic(() => import("../../../../components/DynamicMap"), {
  ssr: false,
});

const OrganizationPage: React.FC = () => {
  const router = useRouter();
  const { categoryId: categoryIdParam, organizationId: organizationIdParam } =
    router.query;

  const [mergedAwards, setMergedAwards] = useState<RD100Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topLabsData: TopLabsData = topLabsDataImport as unknown as TopLabsData;
  const mapDataRaw: MapData = mapDataImport as unknown as MapData;

  useEffect(() => {
    if (!router.isReady) return;

    setIsLoading(true);
    setError(null);

    const categoryId = Array.isArray(categoryIdParam)
      ? categoryIdParam[0]
      : categoryIdParam;
    const organizationId = Array.isArray(organizationIdParam)
      ? organizationIdParam[0]
      : organizationIdParam;

    if (!categoryId || !organizationId) {
      setError("Invalid category or organization ID.");
      setIsLoading(false);
      return;
    }

    const category = topLabsData.researchCategories.find(
      (cat) => cat.id === categoryId,
    );

    if (!category) {
      setError("The specified category does not exist.");
      setIsLoading(false);
      return;
    }

    const organization: Organization | undefined =
      topLabsData.organizations.find((org) => org.id === organizationId);

    if (!organization) {
      setError("The specified organization does not exist.");
      setIsLoading(false);
      return;
    }

    const organizationAwards: RD100Award[] = organization.RD100Awards
      ? [...organization.RD100Awards]
      : [];

    const searchProfile = (searchRDProfiles as SearchRDProfile[]).find(
      (profile) => profile.id === organization.id,
    );

    if (searchProfile && searchProfile.RD100Awards) {
      searchProfile.RD100Awards.forEach((award) => {
        const exists = organizationAwards.some(
          (a) =>
            a.year === award.year &&
            a.product === award.product &&
            a.organization === award.organization,
        );
        if (!exists) {
          organizationAwards.push(award);
        }
      });
    }

    setMergedAwards(organizationAwards);
    setIsLoading(false);
  }, [router.isReady, categoryIdParam, organizationIdParam, topLabsData]);

  if (isLoading) {
    return <div className="text-text">Loading organization details...</div>;
  }

  if (error) {
    return <div className="text-text">{error}</div>;
  }

  const categoryId = Array.isArray(categoryIdParam)
    ? categoryIdParam[0]
    : categoryIdParam;
  const organizationId = Array.isArray(organizationIdParam)
    ? organizationIdParam[0]
    : organizationIdParam;

  const category = topLabsData.researchCategories.find(
    (cat) => cat.id === categoryId,
  );
  const organization: Organization | undefined = topLabsData.organizations.find(
    (org) => org.id === organizationId,
  );

  if (!category || !organization) {
    return null;
  }

  /**
   * Enhanced prepareChartData Function
   *
   * @param data - Record of year to count (number or null)
   * @param startYear - Optional start year for the chart
   * @param endYear - Optional end year for the chart
   * @returns Array of { year: number, count: number } or null if all counts are zero
   */
  const prepareChartData = (
    data: Record<string, number | null> | undefined | null,
    startYear?: number,
    endYear?: number,
  ): { year: number; count: number }[] | null => {
    if (!data) return null;

    // Convert data entries, treating null or undefined counts as 0
    const entries = Object.entries(data).map(([year, count]) => [
      parseInt(year, 10),
      count ?? 0,
    ]);

    // Determine the range of years
    const years = entries.map(([year]) => year);
    const definedStartYear = startYear || Math.min(...years);
    const definedEndYear = endYear || Math.max(...years);

    // Generate all years within the range
    const allYears = Array.from(
      { length: definedEndYear - definedStartYear + 1 },
      (_, i) => definedStartYear + i,
    );

    // Create complete entries ensuring all years are represented
    const completeEntries = allYears.map((year) => {
      const entry = entries.find(([y]) => y === year);
      return { year, count: entry ? entry[1] : 0 };
    });

    // Sort entries by year
    completeEntries.sort((a, b) => a.year - b.year);

    // Return null if all counts are zero
    if (completeEntries.every((entry) => entry.count === 0)) {
      return null;
    }

    return completeEntries;
  };

  // Define the range of years for the charts (optional)
  const chartStartYear = 2019;
  const chartEndYear = new Date().getFullYear(); // e.g., 2024

  // Prepare chart data with null handling and complete year range
  const publicationsData = prepareChartData(
    organization.stats?.publications?.papersPerYear,
    chartStartYear,
    chartEndYear,
  );
  const patentsData = prepareChartData(
    organization.stats?.patents?.patentsPerYear,
    chartStartYear,
    chartEndYear,
  );

  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoUrl = organization.multimedia?.find(
    (item) =>
      item.type.toLowerCase().includes("video") ||
      item.url.includes("youtube.com"),
  )?.url;
  const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

  const isCompanyOrSubsidiaryFeature = (
    feature: Feature,
  ): feature is CompanyFeature | SubsidiaryFeature =>
    feature.properties !== null &&
    (feature.properties.entityType === "Company" ||
      feature.properties.entityType === "Subsidiary");

  const mapData: MapData = {
    type: mapDataRaw.type,
    features: mapDataRaw.features.filter(
      (feature: Feature): feature is MapFeatureUnion => {
        return (
          isCompanyOrSubsidiaryFeature(feature) &&
          Array.isArray(feature.geometry.coordinates) &&
          feature.geometry.coordinates.length === 2 &&
          typeof feature.geometry.coordinates[0] === "number" &&
          typeof feature.geometry.coordinates[1] === "number"
        );
      },
    ),
  };

  const currentCompany: CompanyFeature | SubsidiaryFeature | undefined =
    mapData.features.find(
      (feature) =>
        isCompanyOrSubsidiaryFeature(feature) &&
        feature.properties.id === organization.id,
    ) as CompanyFeature | SubsidiaryFeature | undefined;

  const renderMap = () => {
    if (!currentCompany) {
      return (
        <div className="text-white">
          No map data available for this organization.
        </div>
      );
    }

    const [lng, lat] = currentCompany.geometry.coordinates;
    if (typeof lat !== "number" || typeof lng !== "number") {
      return (
        <div className="text-white">
          Location data is not available for this organization.
        </div>
      );
    }

    const companyMapData: MapData = {
      type: "FeatureCollection",
      features: [currentCompany as MapFeatureUnion],
    };

    return (
      <div className="h-96 w-full">
        <DynamicMap mapData={companyMapData} showCompanyDetails={true} />
      </div>
    );
  };

  const currentOrgIndex = category.organizations.findIndex(
    (orgId) => orgId === organizationId,
  );
  const nextOrgIndex = (currentOrgIndex + 1) % category.organizations.length;
  const nextOrganizationId = category.organizations[nextOrgIndex];
  const nextOrganization = topLabsData.organizations.find(
    (org) => org.id === nextOrganizationId,
  );

  const breadcrumbItems = [
    { name: "Categories", href: "/category" },
    { name: category.name, href: `/category/${category.id}` },
    {
      name: organization.name,
      href: `/category/${category.id}/organization/${organization.id}`,
    },
  ];

  return (
    <>
      <Head>
        <title>
          {organization.name} - {category.name} - Top Labs
        </title>
        <meta
          name="description"
          content={`Explore details of ${organization.name} in ${category.name}.`}
        />
      </Head>

      {category.heroImage && (
        <EnhancedNavBar
          items={breadcrumbItems}
          imageSrc={category.heroImage.url}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gray-800 shadow-md rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {organization.heroImage && (
              <div className="flex justify-center lg:justify-start">
                <Image
                  src={organization.heroImage.url}
                  alt={organization.heroImage.altText}
                  width={500}
                  height={400}
                  className="rounded-lg object-cover w-[500px] h-[300px] max-w-full max-h-full"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {organization.name}
              </h1>
              <p className="text-gray-300">{organization.description}</p>
            </div>
          </div>
        </div>

        {/* InfoItem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoItem
            Icon={Clock}
            color="blue"
            label={
              organization.yearEstablished
                ? `Founded ${organization.yearEstablished}`
                : "Year Unknown"
            }
          />
          <InfoItem
            Icon={Globe}
            color="purple"
            label="Visit Website"
            href={organization.website}
          />
        </div>

        {/* Featured Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="space-y-8">
            {videoId && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Video</h3>
                <div className="w-full max-w-3xl mx-auto">
                  <ResponsiveVideo videoId={videoId} />
                </div>
              </div>
            )}

            {organization.featuredContent &&
              organization.featuredContent.length > 0 && (
                <div className="mb-8">
                  <Card title="Featured Content">
                    <FeaturedContentSlideshow
                      content={organization.featuredContent}
                    />
                  </Card>
                </div>
              )}

            {/* Research Areas */}
            {organization.researchAreas &&
              organization.researchAreas.length > 0 && (
                <div className="mb-8">
                  <Card title="Research Areas">
                    <div className="flex flex-wrap gap-2">
                      {organization.researchAreas.map((area, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
          </div>
        </div>

        {/* Awards and Charts Section */}
        <div className="grid gap-8 mb-8">
          {/* R&D 100 Awards Section */}
          {mergedAwards.length > 0 && (
            <Card title="R&D 100 Awards">
              <AwardsExplorer awards={mergedAwards} key={organization.id} />
            </Card>
          )}

          {/* Charts Grid */}
          <div
            className={`grid gap-8 ${
              mergedAwards.length > 0 ? "lg:grid-cols-2" : "lg:grid-cols-1"
            }`}
          >
            {/* Publications Chart */}
            {publicationsData && publicationsData.length > 0 && (
              <Card title="Publications per Year">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={publicationsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#E5E7EB" />
                      <YAxis stroke="#E5E7EB" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "none",
                          color: "#E5E7EB",
                        }}
                        labelStyle={{ color: "#E5E7EB" }}
                      />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Publications Note */}
                {organization.stats?.publications?.notes && (
                  <p className="text-gray-500 text-sm mt-2">
                    {organization.stats.publications.notes}
                  </p>
                )}
              </Card>
            )}

            {/* Patents Chart */}
            {patentsData && patentsData.length > 0 && (
              <Card title="Patents per Year">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patentsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#E5E7EB" />
                      <YAxis stroke="#E5E7EB" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "none",
                          color: "#E5E7EB",
                        }}
                        labelStyle={{ color: "#E5E7EB" }}
                      />
                      <Bar dataKey="count" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Patents Note */}
                {organization.stats?.patents?.notes && (
                  <p className="text-gray-500 text-sm mt-2">
                    {organization.stats.patents.notes}
                  </p>
                )}
              </Card>
            )}
          </div>
        </div>

        {/* Map and Related Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Location on Map */}
          {currentCompany && (
            <Card title="Location on Map">
              <div className="h-96 w-full">{renderMap()}</div>
            </Card>
          )}

          {/* Related Content */}
          {organization.relatedContent &&
            organization.relatedContent.length > 0 && (
              <Card title="Related Content">
                <RelatedContentSlideshow
                  content={organization.relatedContent.map((item) => ({
                    headline: item.headline || item.title || "",
                    url: item.url,
                    imageUrl: item.imageUrl,
                  }))}
                />
              </Card>
            )}
        </div>

        {/* Explore More Labs */}
        {nextOrganization && (
          <Card title="Explore More Labs">
            <div className="flex justify-center">
              <button
                onClick={() =>
                  router.push(
                    `/category/${category.id}/organization/${nextOrganization.id}`,
                  )
                }
                className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Navigate to Next Lab"
              >
                <ArrowRight className="mr-2" /> Next Lab
              </button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default OrganizationPage;
