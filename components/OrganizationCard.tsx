import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ImageProps = {
  url: string;
  altText: string;
};

type Organization = {
  id: string;
  name: string;
  description?: string;
  heroImage?: ImageProps;
  iconImage?: ImageProps; // Added iconImage
};

interface OrganizationCardProps {
  organization: Organization;
  categoryId: string;
  isFeatured?: boolean;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  categoryId,
  isFeatured = false,
}) => {
  return (
    <Link href={`/category/${categoryId}/organization/${organization.id}`} passHref>
      <div className="group block overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
        {/* Container for heroImage and iconImage */}
        <div
          className={`relative ${
            isFeatured ? 'h-96 md:h-112' : 'h-72 md:h-80' // Increased height for hero images
          } bg-gray-200 overflow-hidden`}
        >
          {/* Hero Image */}
          {organization.heroImage ? (
            <Image
              src={organization.heroImage.url}
              alt={organization.heroImage.altText || organization.name}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 group-hover:opacity-90"
              priority={isFeatured} // Prioritize loading for featured cards
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}

          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"></div>

          {/* Icon Image */}
          {organization.iconImage && (
            <div className="absolute top-4 left-4 w-16 h-16 md:w-20 md:h-20">
              <Image
                src={organization.iconImage.url}
                alt={organization.iconImage.altText || `${organization.name} Icon`}
                width={80} // 80px width
                height={80} // 80px height
                className="rounded-full border-2 border-white shadow-md object-cover"
                priority={false}
              />
            </div>
          )}

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-semibold text-white mb-1">
              {organization.name}
            </h3>
            {isFeatured && organization.description && (
              <p className="text-white text-sm line-clamp-3">
                {organization.description}
              </p>
            )}
          </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
              Featured
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OrganizationCard;
