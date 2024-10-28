// types/index.ts

export type YesNo = "y" | "n";

export interface TopLabsData {
  researchCategories: ResearchCategory[];
  organizations: Organization[];
  version: string;
  lastUpdated: string;
  changeLog?: ChangeLogEntry[];
}

export interface ResearchCategory {
  id: string;
  name: string;
  organizations: string[];
  heroImage?: HeroImage;
  officialName: string;
  rorId: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  primaryCategory: string;
  additionalCategories: string[];
  hasProfile: YesNo;
  profileLink: string;
  hasAwards: YesNo;
  awardYears: number[];
  has2024Award: YesNo;
  hasImage: YesNo;
  website?: string;
  location: string;
  researchAreas: string[];
  currentProjects?: Project[];
  collaborations?: Collaboration[];
  facilities?: Facility[];
  yearEstablished?: number;
  officialName: string;
  aliases: string[];
  acronyms: string[];
  externalIds: Record<string, string>;
  organizationType: string;
  teamMembers?: TeamMember[];
  awards?: Award[];
  fundingSources?: FundingSource[];
  multimedia?: Multimedia[];
  stats?: Stats;
  heroImage?: HeroImage;
  isFeatured?: boolean;
  relatedContent?: RelatedContent[];
  recognitions?: Recognition[];
  subsidiaries?: string[];
  geoCoordinates?: GeoCoordinates;
  rorId?: string;
  status?: string;
  parentOrganization?: string;
  paperCount?: number;
  patentCount?: number;
  locations?: Location[];
  headquarters?: Location;
  funding?: string;
  RD100Awards?: RD100Award[];
  keyTechnologies?: KeyTechnology[];
  projects?: Project[];
  featuredContent?: FeaturedContent[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: ProjectImage[];
}

export interface ProjectImage {
  url: string;
  caption: string;
  alt?: string; // Add this line
}

export interface RD100Award {
  product: string;
  year: number;
  organization: string;
}

export interface TeamMember {
  name: string;
  role: string;
  affiliation: string;
  achievements?: string;
}

export interface Collaboration {
  name: string;
  partner: string;
  description: string;
  partnerOrganization?: string;
  collaborationType?: string;
  startDate?: string;
  endDate?: string;
}

export interface Award {
  name: string;
  description: string;
}

export interface Facility {
  facilityId?: string;
  name: string;
  description: string;
  location?: string;
  geoCoordinates?: GeoCoordinates;
}

export interface FundingSource {
  name: string;
  description: string;
}

export interface Multimedia {
  type: string;
  url: string;
  description: string;
}

export interface Stats {
  publications?: Publications;
  patents?: Patents | null;
  funding?: string;
  researchers?: number;
  geoCoordinates?: GeoCoordinates;
  keyProjects?: string[];
  notes?: {
    dataSource: string | null;
  };
}

export interface Publications {
  papersPerYear: Record<string, number>;
  papersLast5Years?: number;
  source: string;
  notes?: string;
  normalizationNote?: string;
  lastUpdated?: string;
}

export interface Patents {
  source: string;
  lastUpdated: string;
  patentsPerYear: Record<string, number>;
  notes: string;
}

export interface HeroImage {
  url: string;
  altText: string;
  webp: WebpImages;
  sizes: string;
}

export interface WebpImages {
  "1000w": string;
  "800w": string;
  "400w": string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Recognition {
  name: string;
  description: string;
  type: string;
}

export interface RelatedContent {
  headline: string;
  url: string;
  imageUrl: string;
  title?: string;
  type?: string;
}

export interface Location {
  country: string;
  admin1?: string;
  admin2?: string;
  city?: string;
  state?: string;
}

export interface ChangeLogEntry {
  date: string;
  description: string;
}

export interface SearchIndexItem {
  id: string;
  name: string;
  description: string;
  type: "organization" | "project" | "award";
  category: string;
  years: number[];
  imageUrl?: string;
  website?: string;
  hasProfile?: boolean;
  hasAwards?: boolean;
  profile_link?: string;
  isAlias?: boolean;
  mainOrganizationId?: string;
}

export interface KeyTechnology {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface FeaturedContent {
  id: string;
  type: "lab" | "project";
  title: string;
  description: string;
  images?: ProjectImage[]; // Make this optional
  labLeader?: string;
}

export interface ImportedTopLabsData {
  researchCategories: ResearchCategory[];
  organizations: Organization[];
  version: string;
}
