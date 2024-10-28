// components/OrganizationCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Organization } from "../types";
import classNames from "classnames";

interface OrganizationCardProps {
  organization: Organization;
  categoryId: string;
  size?: "small" | "normal";
  featured?: boolean;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  categoryId,
  size = "normal",
  featured = false,
}) => {
  const isSmall = size === "small";
  const cardClasses = classNames(
    "group block overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg",
    {
      "border-2 border-yellow-400": featured,
    },
  );

  const renderImage = () => {
    if (organization.heroImage && organization.heroImage.webp) {
      return (
        <picture>
          <source
            type="image/webp"
            srcSet={`${organization.heroImage.webp["400w"] || ""} 400w, ${organization.heroImage.webp["800w"] || ""} 800w, ${organization.heroImage.webp["1000w"] || ""} 1000w`}
            sizes={organization.heroImage.sizes}
          />
          <Image
            src={organization.heroImage.url}
            alt={organization.heroImage.altText}
            fill
            style={{ objectFit: "cover" }}
            className="transition-opacity duration-300 group-hover:opacity-90"
            priority={featured}
            loading={featured ? "eager" : "lazy"}
          />
        </picture>
      );
    } else {
      return (
        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No Image</span>
        </div>
      );
    }
  };

  return (
    <Link
      href={`/category/${categoryId}/organization/${organization.id}`}
      className={cardClasses}
    >
      <div
        className={`
          relative 
          ${featured ? "h-[500px]" : isSmall ? "h-40" : "h-56"} 
          bg-gray-800 
          overflow-hidden
        `}
      >
        {renderImage()}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3
            className={`
              font-semibold text-white 
              ${isSmall ? "text-sm" : "text-base"} 
              line-clamp-2
            `}
          >
            {organization.name}
          </h3>
        </div>
        {featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
    </Link>
  );
};

export default OrganizationCard;
