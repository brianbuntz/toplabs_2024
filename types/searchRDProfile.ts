// types/searchRDProfile.ts
export interface SearchRDProfile {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  website: string;
  profile_link: string;
  RD100Awards: RD100Award[];
  projects: Project[];
  primaryCategory: string;
  coreCategories: string[];
  researchAreas: string[];
  additionalCategories: string[];
  RD100YearsWon: number[];
  categories: string;
}

export interface RD100Award {
  year: number;
  product: string;
  organization?: string;
}

export interface Project {}
