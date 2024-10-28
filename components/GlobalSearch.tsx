// components/GlobalSearch.tsx
import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import Downshift from "downshift";
import { SearchRDProfile } from "../types/searchRDProfile";
import searchRDProfiles from "../data/searchRDProfiles.json";

const GlobalSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchRDProfile[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const router = useRouter();

  const fuse = useMemo(
    () =>
      new Fuse<SearchRDProfile>(searchRDProfiles as SearchRDProfile[], {
        keys: ["name", "aliases", "description", "categories"],
        threshold: 0.4,
      }),
    [],
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchTerm(query);
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      const results = fuse.search(query).map((result) => result.item);
      setSuggestions(results.slice(0, 10));
    },
    [fuse],
  );

  const getSearchItemRoute = (item: SearchRDProfile) => {
    return item.profile_link;
  };

  const handleSelectSuggestion = useCallback(
    (item: SearchRDProfile | null) => {
      if (!item) return;

      const route = getSearchItemRoute(item);
      router.push(route);

      setSearchTerm("");
      setSuggestions([]);
      setIsSearchActive(false);
    },
    [router],
  );

  const toggleSearchBar = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Downshift
        id="global-search"
        onChange={handleSelectSuggestion}
        inputValue={searchTerm}
        onInputValueChange={(value) => handleSearch(value || "")}
        itemToString={(item) => (item ? item.name : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
        }) => (
          <div className="relative">
            <form
              onSubmit={(e) => e.preventDefault()}
              className={`flex items-center bg-background-new p-1 rounded-full transition-all duration-300 ${
                isSearchActive ? "w-64" : "w-12"
              }`}
            >
              <button
                type="button"
                onClick={toggleSearchBar}
                className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-2 rounded-full hover:from-gray-700 hover:to-gray-600 transition-colors"
                aria-label="Open Search"
              >
                <Search size={20} />
              </button>
              {isSearchActive && (
                <input
                  {...getInputProps({
                    placeholder: "Search awards or companies...",
                    className:
                      "px-4 py-2 rounded-l-full border-2 border-gray-700 focus:outline-none focus:border-blue-500 bg-gray-800 text-white ml-2",
                    "aria-label": "Search Awards or Companies",
                    autoFocus: true,
                    onBlur: () => setIsSearchActive(false),
                  })}
                />
              )}
            </form>
            {isOpen && suggestions.length > 0 && (
              <ul
                {...getMenuProps()}
                className="absolute left-0 right-0 bg-gray-700 mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
              >
                {suggestions.map((item, index) => (
                  <li
                    key={item.id}
                    {...getItemProps({
                      index,
                      item,
                      className: `px-4 py-2 ${
                        highlightedIndex === index
                          ? "bg-gray-600"
                          : "bg-gray-700"
                      } cursor-pointer`,
                    })}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default GlobalSearch;
