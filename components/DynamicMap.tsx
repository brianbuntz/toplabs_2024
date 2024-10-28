// components/DynamicMap.tsx

import dynamic from "next/dynamic";
import React, { ErrorInfo } from "react";
import { MapData } from "../types/map";

interface DynamicMapProps {
  mapData: MapData;
  showCompanyDetails: boolean;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Remove the unused parameter
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Map component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with the map.</h1>;
    }
    return this.props.children;
  }
}

const DynamicMap: React.FC<DynamicMapProps> = ({
  mapData,
  showCompanyDetails,
}) => {
  console.log("Rendering DynamicMap");
  console.log(`MapData features count: ${mapData.features.length}`);

  const MapComponentWithNoSSR = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  return (
    <ErrorBoundary>
      <MapComponentWithNoSSR
        mapData={mapData}
        showCompanyDetails={showCompanyDetails}
      />
    </ErrorBoundary>
  );
};

export default DynamicMap;
