"use client";
import React, { useState, useMemo, useCallback } from "react";
import debounce from "lodash.debounce";
import CircularProgress from "@/components/CircularProgress";
import { isValidCoordinate } from "@/lib/utils";

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    latitude: "",
    longitude: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchClick = () => {
    // Destructure for easier access
    const { query, latitude, longitude } = searchParams;

    // Check if all fields are filled
    if (!query.trim() || !latitude.trim() || !longitude.trim()) {
      alert("Please fill in all fields before searching."); // TODO: use react-toastify
      return; // Early return to prevent further execution
    }

    // Proceed with fetching suggestions
    fetchSuggestions(searchParams);
  };

  const fetchSuggestions = async (
    params:
      | string
      | string[][]
      | Record<string, string>
      | URLSearchParams
      | undefined,
  ) => {
    setLoading(true);
    const queryParams = new URLSearchParams(params);
    try {
      const res = await fetch(`/api/search?${queryParams}`);
      const data = await res.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      //TODO: Show error on the FE
      alert("Error fetching data.");
      console.error("Error fetching data:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Use `useCallback` to memoize the debounced function
  const debouncedFetchSuggestions = useCallback(
    debounce((params) => fetchSuggestions(params), 300),
    [],
  );

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (name === "latitude" || name === "longitude") {
      const isValid = isValidCoordinate(value, name);

      if (!isValid) {
        alert("Invalid input for " + name); // TODO: use react-toastify
        return; // Prevent state update with invalid value
      }
    }
    setSearchParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        [name]: value,
      };

      // Check if all required fields have values
      if (
        updatedParams.query &&
        updatedParams.latitude &&
        updatedParams.longitude
      ) {
        debouncedFetchSuggestions(updatedParams);
      }

      return updatedParams;
    });

    if (!value.trim().length) {
      setSuggestions([]);
    }
  };
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-6 md:p-24">
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Query Input with Border and Focus Style */}
          <div className="flex-grow">
            <input
              className="w-full pt-[3px] pb-[4px] border-b border-black focus:border-blue-500 outline-none transition-colors"
              placeholder="Search county..."
              type="text"
              name="query"
              value={searchParams.query}
              onChange={handleInputChange}
            />
          </div>

          {/* Latitude Input with Border and Focus Style */}
          <div className="flex-grow relative">
            <input
              className="w-full pt-[3px] pb-[4px] border-b border-black focus:border-blue-500 outline-none transition-colors"
              placeholder="Latitude"
              type="text"
              name="latitude"
              value={searchParams.latitude}
              onChange={handleInputChange}
            />
            {/* <div className="absolute right-0 top-0 bottom-0 hidden md:block border-r border-black mx-[4px]"></div> */}
          </div>

          {/* Longitude Input with Border and Focus Style */}
          <div className="flex-grow relative">
            <input
              className="w-full pt-[3px] pb-[4px] border-b border-black focus:border-blue-500 outline-none transition-colors"
              placeholder="Longitude"
              type="text"
              name="longitude"
              value={searchParams.longitude}
              onChange={handleInputChange}
            />
          </div>

          {/* Search Button */}
          <button
            className="w-full md:w-auto bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </div>
      {/* Search Results Container with Reduced Margin */}
      {suggestions?.length !== 0 && (
        <p className="m-4 font-semibold">Suggestions:</p>
      )}
      <div
        className="w-full max-w-4xl mt-8 overflow-auto"
        style={{ maxHeight: "400px" }}
      >
        <div className="flex flex-col items-start relative self-stretch w-full">
          <div className="flex flex-wrap items-start gap-4">
            {loading && <div className="text-lg font-semibold">Loading...</div>}
            {suggestions &&
              suggestions.map((suggestion: any, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-2 px-4 py-2 relative rounded-md border border-solid border-gray-200 bg-gray-50 shadow-lg"
                >
                  {/* First Row: City, Name, Country */}
                  <div className="flex-1">
                    <div className="truncate font-normal text-geolocationappblack text-sm sm:text-base">
                      {`${suggestion.name}`}
                    </div>
                  </div>

                  {/* Second Row: Score and Circular Progress */}
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0 font-normal text-geolocationappblack text-sm sm:text-base">
                      Score: {suggestion.score}
                    </div>
                    <div className="shrink-0">
                      <CircularProgress progress={suggestion.score} />
                    </div>
                  </div>
                  {/* Lat */}
                  <div className="truncate font-normal text-geolocationappblack text-sm sm:text-base">
                    Lat: {`${suggestion.latitude}`}
                  </div>
                  <div className="truncate font-normal text-geolocationappblack text-sm sm:text-base">
                    Lon: {`${suggestion.longitude}`}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
