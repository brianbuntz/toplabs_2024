import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface RelatedContent {
  headline: string;
  url: string;
  imageUrl?: string;
}

interface RelatedContentSlideshowProps {
  content: RelatedContent[];
}

const RelatedContentSlideshow: React.FC<RelatedContentSlideshowProps> = ({
  content,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + content.length) % content.length,
    );
  };

  if (content.length === 0) return null;

  const currentItem = content[currentIndex];

  return (
    <div className="relative w-full">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        {currentItem.imageUrl ? (
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.headline}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        ) : (
          <div className="bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">No image available</span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{currentItem.headline}</h3>
      <a
        href={currentItem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Read More
      </a>
      {content.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/3 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            aria-label="Previous Related Content"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/3 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            aria-label="Next Related Content"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default RelatedContentSlideshow;
