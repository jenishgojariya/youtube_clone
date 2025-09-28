import { YOUTUBE_SEARCH_API } from "@/constants/api";
import { toggleMenu } from "@/lib/features/appSlice";
import { setSuggestions } from "@/lib/features/searchSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  BiSearch,
  BiMicrophone,
  BiVideoPlus,
  BiBell,
  BiUser,
} from "react-icons/bi";

interface SuggestionsMap {
  [key: string]: string[];
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionsData, setSuggestionsData] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();
  const suggestions = useAppSelector<SuggestionsMap>(
    (state) => state.search.suggestions
  );

  const handleMenuClick = () => {
    dispatch(toggleMenu());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setActiveSuggestionIndex(-1); // Reset active index when typing
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryToSubmit =
      activeSuggestionIndex >= 0
        ? suggestionsData[activeSuggestionIndex]
        : searchQuery;

    if (queryToSubmit.trim()) {
      setSearchQuery(queryToSubmit);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      // Here you can call your search API with queryToSubmit
      console.log("Search submitted:", queryToSubmit);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    // Call search API with the selected suggestion
    console.log("Suggestion selected:", suggestion);
  };

  const getSearchSuggestions = async () => {
    if (!searchQuery.trim()) {
      setSuggestionsData([]);
      setActiveSuggestionIndex(-1);
      return;
    }

    if (suggestions[searchQuery]) {
      setSuggestionsData(suggestions[searchQuery]);
      return;
    }

    try {
      const res = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const data = await res.json();
      if (data) {
        dispatch(setSuggestions({ query: searchQuery, suggestions: data[1] }));
        setSuggestionsData(data[1] || []);
        setActiveSuggestionIndex(-1); // Reset active index when new suggestions load
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!showSuggestions || suggestionsData.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveSuggestionIndex((prev) =>
            prev < suggestionsData.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setActiveSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : suggestionsData.length - 1
          );
          break;

        case "Enter":
          e.preventDefault();
          if (activeSuggestionIndex >= 0) {
            const selectedSuggestion = suggestionsData[activeSuggestionIndex];
            setSearchQuery(selectedSuggestion);
            setShowSuggestions(false);
            setActiveSuggestionIndex(-1);
            // Call search API with the selected suggestion
            console.log("Suggestion selected via Enter:", selectedSuggestion);
          }
          break;

        case "Escape":
          setShowSuggestions(false);
          setActiveSuggestionIndex(-1);
          break;
      }
    },
    [showSuggestions, suggestionsData, activeSuggestionIndex]
  );

  // Scroll active suggestion into view
  useEffect(() => {
    if (activeSuggestionIndex >= 0 && suggestionsListRef.current) {
      const activeElement = suggestionsListRef.current.children[
        activeSuggestionIndex
      ] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [activeSuggestionIndex]);

  useEffect(() => {
    const handler = setTimeout(getSearchSuggestions, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu + Logo */}
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-800"></div>
              <div className="w-full h-0.5 bg-gray-800"></div>
              <div className="w-full h-0.5 bg-gray-800"></div>
            </div>
          </button>

          <Link href="/" className="ml-4 flex items-center">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube Logo"
              width={80}
              height={24}
              className="h-6"
              priority
            />
          </Link>
        </div>

        {/* Center Section - Search */}
        <div ref={searchRef} className="flex-1 max-w-2xl mx-8 relative">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              ref={inputRef}
              type="text"
              className="w-full h-10 px-4 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
            />
            <button
              type="submit"
              className="h-10 px-6 bg-gray-50 border border-gray-300 border-l-0 rounded-r-full hover:bg-gray-100 transition-colors"
            >
              <BiSearch className="text-xl text-gray-600" />
            </button>
          </form>

          {showSuggestions && suggestionsData.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              <ul ref={suggestionsListRef} className="py-2">
                {suggestionsData.slice(0, 8).map((suggestion, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm transition-colors ${
                        index === activeSuggestionIndex
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseEnter={() => setActiveSuggestionIndex(index)}
                    >
                      <BiSearch
                        className={`flex-shrink-0 ${
                          index === activeSuggestionIndex
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      />
                      <span>{suggestion}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center justify-end flex-shrink-0 space-x-3">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Voice search"
          >
            <BiMicrophone className="text-xl text-gray-700" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Create video"
          >
            <BiVideoPlus className="text-xl text-gray-700" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <BiBell className="text-xl text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition-colors border border-gray-300"
            aria-label="User account"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <BiUser className="text-white text-lg" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
