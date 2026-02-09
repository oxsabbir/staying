"use client";

// context/SearchContext.js
import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  data: {
    city: null,
    checkIn: null,
    checkOut: null,
    totalGuest: 0,
    guests: {},
  },
  updateData: (payload) => {},
});

export function SearchProvider({ children }) {
  const [data, setData] = useState({
    city: null,
    checkIn: null,
    checkOut: null,
    totalGuest: 0,
    guests: null,
  });
  const updateData = (payload) => {
    setData(payload);
  };

  return (
    <SearchContext.Provider value={{ data, updateData }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
