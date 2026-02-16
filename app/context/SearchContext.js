"use client";

// context/SearchContext.js
import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  data: {
    city: null,
    checkIn: null,
    checkOut: null,
    totalGuest: 0,
    guests: { adults: 2, children: 0, rooms: 1 },
  },
  updateData: (payload) => {},
});

export function SearchProvider({ children }) {
  const [data, setData] = useState({
    city: null,
    checkIn: null,
    checkOut: null,
    totalGuest: 0,
    guests: { adults: 2, children: 0, rooms: 1 },
  });
  const updateData = (payload) => {
    setData((prev) => ({ ...prev, ...payload }));
  };

  return (
    <SearchContext.Provider value={{ data, updateData }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
