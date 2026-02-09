"use client";

import { useState, useEffect } from "react";
import { roomDetailsData } from "../../../data/roomDetails";
import PropertySlider from "../shared/PropertySlider";

export default function UniqueProperties() {
  const [randomProperties, setRandomProperties] = useState([]);

  useEffect(() => {
    const allProperties = Object.values(roomDetailsData);
    // Simple shuffle and slice to get 10 random items
    setRandomProperties(allProperties.slice(0, 10));
  }, []);

  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-[1.35rem] font-semibold">
          Stay at our top unique properties
        </h2>
        <p className="mt-2 text-muted">
          From castles and villas to boats and igloos, we have it all
        </p>
        <div className="mt-4">
          <PropertySlider items={randomProperties} />
        </div>
      </div>
    </section>
  );
}
