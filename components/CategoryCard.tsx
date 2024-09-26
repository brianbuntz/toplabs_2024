// components/CategoryCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Category = {
  id: string;
  name: string;
  heroImage: {
    url: string;
    altText: string;
  };
};

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <Link
      href={`/category/${category.id}`}
      className="relative group block overflow-hidden rounded-lg"
      aria-label={`View details about ${category.name}`}
    >
      <Image
        src={category.heroImage.url}
        alt={category.heroImage.altText}
        width={300}
        height={200}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <h2 className="text-lg font-bold text-white">{category.name}</h2>
      </div>
    </Link>
  );
};

export default CategoryCard;