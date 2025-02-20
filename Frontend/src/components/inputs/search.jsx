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
          const response = await fetch(`http://127.0.0.1:8000/api/s-search/?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setSuggestions(data.map(item => item.search_query));
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
    handleInputFocus();
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
      setFocusedSuggestionIndex((prevIndex) =>
        Math.max(prevIndex - 1, 0)
      );
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (focusedSuggestionIndex === 0) {
        setQuery(query); // Don't change the query
      } else if (suggestions.length > 0) {
        setQuery(suggestions[focusedSuggestionIndex - 1]); // Select the focused suggestion
      }
      setFocusedSuggestionIndex(0);
      setIsFocused(true);
    }
    if (e.key === "Escape") {
      inputRef.current.blur(); 
    }
    if (e.key === "Enter") {
      const searchQuery = focusedSuggestionIndex === 0 ? query : suggestions[focusedSuggestionIndex - 1];
      setQuery(searchQuery);
      setFocusedSuggestionIndex(0);
      handleInputBlur();
      console.log("You searched for ", searchQuery);
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    console.log("Search specified: ", suggestion);
    navigate(`/search?q=${suggestion}`);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  const clearInput = () => {
    setQuery("");
    inputRef.current.focus();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className="w-full p-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
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
          className="absolute right-2 top-1 w-8 h-8 bg-gray-300 rounded-full p-1 text-center flex text-black items-center justify-center"
          aria-label="Clear search"
        >
          &times;
        </button>
      )}

      {isFocused && (suggestions.length > 0) && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg p-4 flex">
          <ul
            id="suggestions-list"
            className="w-2/3 mr-2"
            role="listbox"
          >
            <li
              id="suggestion-query"
              key="query"
              className={`p-2 cursor-pointer text-black hover:bg-gray-100 ${focusedSuggestionIndex === 0 ? "bg-gray-100" : ""}`}
              onMouseDown={() => handleSuggestionClick(query)}
              aria-selected={focusedSuggestionIndex === 0}
              role="option"
            >
              "{query}"
            </li>
            
            {suggestions.map((suggestion, index) => (
              <li
                id={`suggestion-${index}`}
                key={index}
                className={`p-2 cursor-pointer text-black hover:bg-gray-100 ${index + 1 === focusedSuggestionIndex ? "bg-gray-100" : ""}`}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                aria-selected={index + 1 === focusedSuggestionIndex}
                role="option"
              >
                {suggestion}
              </li>
            ))}
          </ul>

          <ul className="w-1/3 bg-gray-100 p-2 rounded-lg">
            <li className="text-black text-center font-semibold">Popular Keywords</li>
            <li className="p-2 cursor-pointer hover:bg-gray-200 text-black">Example Keyword</li>
            <li className="p-2 cursor-pointer hover:bg-gray-200 text-black">Example Keyword</li>
            <li className="p-2 cursor-pointer hover:bg-gray-200 text-black">Example Keyword</li>
            <li className="p-2 cursor-pointer hover:bg-gray-200 text-black">Example Keyword</li>
          </ul>
        </div>
      )}

      {isFocused && suggestions.length === 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg p-4 flex justify-center text-black">
          No suggestions found
        </div>
      )}
    </div>
  );
};

export default SearchInput;
