// components/CategoryCard.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ResearchCategory, Organization } from "../types";

interface CategoryCardProps {
  category: ResearchCategory;
  getOrganization: (orgId: string) => Organization | undefined;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  getOrganization,
}) => {
  const { id, name, heroImage, organizations } = category;

  // Use optional chaining and nullish coalescing to handle potential undefined values
  const firstOrganization = organizations?.[0]
    ? getOrganization(organizations[0])
    : undefined;

  if (!heroImage) {
    return null; // Or render a placeholder if you prefer
  }

  return (
    <Link
      href={`/category/${id}`}
      className="relative group block overflow-hidden rounded-lg"
      aria-label={`View details about ${name}`}
    >
      <picture>
        <source
          type="image/webp"
          srcSet={`${heroImage.webp["400w"]} 400w, ${heroImage.webp["800w"]} 800w, ${heroImage.webp["1000w"]} 1000w`}
          sizes={heroImage.sizes}
        />
        <Image
          src={heroImage.url}
          alt={heroImage.altText}
          width={300}
          height={200}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <h2 className="text-lg font-bold text-white">{name}</h2>
        {firstOrganization && (
          <p className="text-sm text-gray-300" style={{ display: "none" }}>
            {firstOrganization.name}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
