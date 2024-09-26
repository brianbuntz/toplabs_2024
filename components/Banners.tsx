// components/Banners.tsx
import React from 'react';
import Image from 'next/image';

const LogoBanner: React.FC = () => (
  <div className="logo-banner w-full mb-4 flex justify-center">
    <div className="w-full max-w-[600px]"> {/* Constrain the logo width */}
      <Image
        src="https://www.rdworldonline.com/wp-content/uploads/2024/09/RD_world_top_labs-scaled.gif" 
        alt="RD World Top Labs"
        width={600} // Reduced width
        height={75} // Adjusted height to maintain aspect ratio
        className="w-full h-auto" // Responsive sizing
      />
    </div>
  </div>
);

const AdBanner: React.FC = () => (
  <div className="ad-banner w-full mb-4 flex justify-center">
    <div className="w-full max-w-[800px]"> {/* Slightly wider container for the ad */}
      <Image
        src="/banner_ad.gif" 
        alt="Banner Ad"
        width={800} // Increased width
        height={100} // Adjusted height to maintain aspect ratio
        className="w-full h-auto rounded"
        unoptimized
      />
    </div>
  </div>
);

const Banners: React.FC = () => (
  <div className="banners-container w-full max-w-[1000px] mx-auto"> {/* Constrain overall width */}
    <LogoBanner />
    <AdBanner />
  </div>
);

export default Banners;