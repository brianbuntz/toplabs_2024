import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapData, MapFeatureUnion, CompanyFeature } from "../types/map";

export interface MapComponentProps {
  mapData: MapData;
  showCompanyDetails: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapData,
  showCompanyDetails,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const isCompanyFeature = (
    feature: MapFeatureUnion,
  ): feature is CompanyFeature => feature.properties.entityType === "Company";

  const calculateBounds = (): L.LatLngBounds | null => {
    const validFeatures = mapData.features.filter(
      (feature: MapFeatureUnion) =>
        feature.geometry.coordinates[0] !== 0 &&
        feature.geometry.coordinates[1] !== 0 &&
        Math.abs(feature.geometry.coordinates[1]) <= 90 &&
        Math.abs(feature.geometry.coordinates[0]) <= 180,
    );

    console.log(
      `Valid features: ${validFeatures.length} out of ${mapData.features.length}`,
    );

    if (validFeatures.length === 0) {
      console.warn("No valid coordinates found in map data");
      return null;
    }

    const bounds = L.latLngBounds(
      validFeatures.map((feature) =>
        L.latLng(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ),
      ),
    );

    console.log(`Calculated bounds: ${JSON.stringify(bounds)}`);
    return bounds;
  };

  const bounds = calculateBounds();

  useEffect(() => {
    const defaultIcon = L.icon({
      iconUrl: "/leaflet/marker-icon.png",
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      shadowUrl: "/leaflet/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  const MapBoundsComponent = () => {
    const map = useMap();
    useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds);
        console.log("Map bounds set");
      } else {
        console.warn("Unable to set map bounds");
        map.setView([0, 0], 2);
      }
      setIsMapReady(true);
      mapRef.current = map;
      console.log("Map created");
    }, [map]);
    return null;
  };

  if (mapData.features.length === 0) {
    console.warn("No features in map data");
    return <div>Map data not available.</div>;
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        className="darkThemeMap"
        zoomControl={false}
        center={[0, 0]}
        zoom={2}
      >
        <MapBoundsComponent />
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isMapReady &&
          mapData.features.map((feature: MapFeatureUnion, index) => {
            const [lng, lat] = feature.geometry.coordinates;
            if (lng === 0 && lat === 0) {
              console.warn(
                `Invalid coordinates for feature ${feature.properties.id}: [${lng}, ${lat}]`,
              );
              return null;
            }
            if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
              console.warn(
                `Out of range coordinates for feature ${feature.properties.id}: [${lng}, ${lat}]`,
              );
              return null;
            }

            return (
              <Marker
                key={`${feature.properties.id}-${index}`}
                position={[lat, lng]}
              >
                <Popup className="darkThemePopup">
                  <strong>{feature.properties.name}</strong>
                  <br />
                  <a
                    href={feature.properties.ror}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ROR Profile
                  </a>
                  {showCompanyDetails && isCompanyFeature(feature) && (
                    <>
                      <br />
                      Established: {feature.properties.established}
                      <br />
                      <a
                        href={feature.properties.wikipediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wikipedia
                      </a>
                      {feature.properties.website && (
                        <>
                          <br />
                          <a
                            href={feature.properties.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Website
                          </a>
                        </>
                      )}
                      <br />
                      Type: {feature.properties.types.join(", ")}
                    </>
                  )}
                  <br />
                  Location: {feature.properties.city},{" "}
                  {feature.properties.state}, {feature.properties.country}
                  {feature.properties.formattedAddress && (
                    <>
                      <br />
                      Address: {feature.properties.formattedAddress}
                    </>
                  )}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
