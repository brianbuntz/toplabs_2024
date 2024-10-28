import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { FeaturedContent, ProjectImage } from "../types";

interface FeaturedContentSlideshowProps {
  content: FeaturedContent[];
}

const FeaturedContentSlideshow: React.FC<FeaturedContentSlideshowProps> = ({
  content,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [content]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + content.length) % content.length,
    );
  };

  if (!content || !Array.isArray(content) || content.length === 0) {
    return <div className="text-gray-300">No featured content available</div>;
  }

  const currentContent = content[currentIndex];

  if (!currentContent || typeof currentContent !== "object") {
    return (
      <div className="text-gray-300">
        Error: Invalid content at index {currentIndex}
      </div>
    );
  }

  const currentImage: ProjectImage | undefined = currentContent.images?.[0];

  return (
    <div className="relative w-full">
      {currentImage && (
        <div className="relative w-full h-0 pb-[56.25%] mb-4">
          <Image
            src={currentImage.url}
            alt={
              currentImage.alt ||
              currentImage.caption ||
              currentContent.title ||
              "Featured content image"
            }
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {content.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm z-10">
                {currentIndex + 1}/{content.length}
              </div>
            </>
          )}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 text-white">
        {currentContent.title ?? "Untitled"}
      </h3>
      {currentContent.type === "lab" && currentContent.labLeader && (
        <p className="text-gray-400 mb-2">Led by {currentContent.labLeader}</p>
      )}
      <p className="text-gray-300 mb-4">
        {currentContent.description ?? "No description available"}
      </p>
    </div>
  );
};

export default FeaturedContentSlideshow;
