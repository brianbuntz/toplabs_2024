// utils/searchRouting.ts
import { SearchIndexItem } from "../types";

export function getSearchItemRoute(item: SearchIndexItem): string {
  return item.profile_link || ""; // Returns an empty string if profile_link is undefined
}
