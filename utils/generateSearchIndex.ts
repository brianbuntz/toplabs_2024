// utils/generateSearchIndex.ts
import fs from "fs/promises";
import path from "path";

interface RD100Award {
  year: number;
  product: string;
  organization: string;
}

interface SearchRDProfile {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  website: string;
  profile_link: string;
  RD100Awards: RD100Award[];
  primaryCategory: string;
  coreCategories: string[];
  researchAreas: string[];
  additionalCategories: string[];
  RD100YearsWon: number[];
  categories: string;
}

interface SearchIndexItem {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  profile_link: string;
  primaryCategory: string; // Added primaryCategory
}

async function generateSearchIndex(): Promise<SearchIndexItem[]> {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), "data", "searchRDProfiles.json");
    const data = await fs.readFile(filePath, "utf-8");
    const profiles: SearchRDProfile[] = JSON.parse(data);

    // Create the streamlined search index
    const searchIndex: SearchIndexItem[] = profiles.map((profile) => ({
      id: profile.id,
      name: profile.name,
      aliases: profile.aliases,
      description: profile.description,
      // Construct profile_link based on primaryCategory
      profile_link: `/category/${profile.primaryCategory.toLowerCase()}/organization/${profile.id}`,
      primaryCategory: profile.primaryCategory, // Include primaryCategory
    }));

    // Write the new search index to a file
    const outputPath = path.join(
      process.cwd(),
      "data",
      "streamlinedSearchIndex.json",
    );
    await fs.writeFile(outputPath, JSON.stringify(searchIndex, null, 2));

    console.log("Streamlined search index generated and written to file");

    return searchIndex;
  } catch (error) {
    console.error("Error generating search index:", error);
    throw error;
  }
}

// Execute the function
generateSearchIndex().catch(console.error);
