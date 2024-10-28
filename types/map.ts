// types/map.ts
export interface GeoJsonPoint {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface BaseProperties {
  id: string;
  name: string;
  ror: string;
  entityType: "Company" | "Subsidiary";
  formattedAddress: string;
  country: string;
  city: string;
  state: string;
  types: string[];
  established: number;
  wikipediaUrl: string;
  website: string;
  standardized_name: string;
  aliases: string[];
}

export interface CompanyProperties extends BaseProperties {
  entityType: "Company";
}

export interface SubsidiaryProperties extends BaseProperties {
  entityType: "Subsidiary";
  parentCompanyId: string;
  locationStatus?: "Known" | "Unknown";
}

export interface MapFeature<T extends BaseProperties> {
  type: "Feature";
  geometry: GeoJsonPoint;
  properties: T;
}

export type CompanyFeature = MapFeature<CompanyProperties>;
export type SubsidiaryFeature = MapFeature<SubsidiaryProperties>;
export type MapFeatureUnion = CompanyFeature | SubsidiaryFeature;

export interface MapData {
  type: "FeatureCollection";
  features: MapFeatureUnion[];
}

export interface Relationship {
  type: string;
  label: string;
  id: string;
}

export type ExtractCompanies = MapData["features"][number] extends infer T
  ? T extends CompanyFeature
    ? T
    : never
  : never;

export type ExtractSubsidiaries = MapData["features"][number] extends infer T
  ? T extends SubsidiaryFeature
    ? T
    : never
  : never;

// Additional types from the main types file that are map-related
export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Location {
  country: string;
  admin1?: string;
  admin2?: string;
  city?: string;
  state?: string;
}
