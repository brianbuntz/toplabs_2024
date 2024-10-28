// components/ResponsiveVideo.tsx
import React from "react";

interface ResponsiveVideoProps {
  videoId: string;
}

const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({ videoId }) => {
  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
};

export default ResponsiveVideo;
