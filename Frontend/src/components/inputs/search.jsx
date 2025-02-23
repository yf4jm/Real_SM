import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/s-search/?q=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          setSuggestions(data.map((item) => item.search_query));
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setFocusedSuggestionIndex(0); // Reset to first suggestion
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      const searchQuery =
        focusedSuggestionIndex === 0 ? query : suggestions[focusedSuggestionIndex - 1];
      setQuery(searchQuery);
      navigate(`/search?q=${searchQuery}`);
      setIsFocused(false); // Close suggestions on search
    } else if (e.key === "Escape") {
      setIsFocused(false); // Close suggestions on escape
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    navigate(`/search?q=${suggestion}`);
    setIsFocused(false); // Close suggestions on click
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsFocused(false), 100); // Delay to allow click events
  };

  const clearInput = () => {
    setQuery("");
    inputRef.current.focus();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          className="w-full pl-4 pr-10 py-2 rounded-full bg-base-200 text-base-content placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-activedescendant={`suggestion-${focusedSuggestionIndex}`}
        />
        {query && (
          <button
            onClick={clearInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-base-300 rounded-full flex items-center justify-center hover:bg-base-400 transition-colors"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-base-100 rounded-lg shadow-lg z-50">
          <div className="flex">
            {/* Search Suggestions */}
            <ul
              id="suggestions-list"
              className="w-2/3 p-2"
              role="listbox"
            >
              <li
                id="suggestion-query"
                key="query"
                className={`p-2 cursor-pointer rounded-lg ${
                  focusedSuggestionIndex === 0 ? "bg-base-200" : "hover:bg-base-200"
                }`}
                onMouseDown={() => handleSuggestionClick(query)}
                aria-selected={focusedSuggestionIndex === 0}
                role="option"
              >
                Search for "{query}"
              </li>
              {suggestions.map((suggestion, index) => (
                <li
                  id={`suggestion-${index + 1}`}
                  key={index}
                  className={`p-2 cursor-pointer rounded-lg ${
                    index + 1 === focusedSuggestionIndex ? "bg-base-200" : "hover:bg-base-200"
                  }`}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                  aria-selected={index + 1 === focusedSuggestionIndex}
                  role="option"
                >
                  {suggestion}
                </li>
              ))}
            </ul>

            {/* Popular Keywords */}
            <div className="w-1/3 p-2 border-l border-base-300">
              <h3 className="text-sm font-semibold text-base-content mb-2">
                Popular Keywords
              </h3>
              <ul>
                {["Example 1", "Example 2", "Example 3", "Example 4"].map((keyword, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-base-200 rounded-lg"
                    onMouseDown={() => handleSuggestionClick(keyword)}
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* No Suggestions Found */}
      {isFocused && suggestions.length === 0 && (
        <div className="absolute w-full mt-2 bg-base-100 rounded-lg shadow-lg p-4 text-base-content">
          No suggestions found
        </div>
      )}
    </div>
  );
};

export default SearchInput;