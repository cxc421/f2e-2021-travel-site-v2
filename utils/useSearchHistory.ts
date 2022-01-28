import { useState, useEffect } from "react";

const SearchHistoryKey = "f2e-travel-site-search-history";

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const searchHistory = localStorage.getItem(SearchHistoryKey);
    if (searchHistory) {
      try {
        const data = JSON.parse(searchHistory);
        if (Array.isArray(data)) {
          setSearchHistory(data);
        } else {
          setSearchHistory([]);
        }
      } catch {
        setSearchHistory([]);
      }
    } else {
      setSearchHistory([]);
    }
  }, []);

  const saveSearchHistory = (searchTerm: string) => {
    const newSearchHistory = [searchTerm, ...searchHistory];
    localStorage.setItem(SearchHistoryKey, JSON.stringify(newSearchHistory));
    setSearchHistory(newSearchHistory);
  };

  const clearSearchHistory = (idx?: number) => {
    let newSearchHistory: string[] = [];
    if (typeof idx === "number") {
      newSearchHistory = searchHistory.filter(
        (_data, curIdx) => curIdx !== idx
      );
    }

    localStorage.setItem(SearchHistoryKey, JSON.stringify(newSearchHistory));
    setSearchHistory(newSearchHistory);
  };

  return {
    searchHistory,
    saveSearchHistory,
    clearSearchHistory,
  };
};
