"use client";
import { useState } from "react";

const SAUDI_DESTINATIONS = [
  { name: "Riyadh", count: "500 properties" },
  { name: "Jeddah", count: "450 properties" },
  { name: "Mecca", count: "300 properties" },
  { name: "Medina", count: "250 properties" },
  { name: "AlUla", count: "100 properties" },
  { name: "Tabuk", count: "80 properties" },
  { name: "Dammam", count: "180 properties" },
  { name: "Khobar", count: "120 properties" },
];

const SAUDI_REGIONS = [
  { name: "Makkah Province", count: "1,200 properties" },
  { name: "Riyadh Province", count: "900 properties" },
  { name: "Eastern Province", count: "700 properties" },
  { name: "Al Madinah Province", count: "400 properties" },
  { name: "Asir Province", count: "200 properties" },
];

const SAUDI_PLACES_TO_STAY = [
  { name: "Hotels", count: "10,000 properties" },
  { name: "Apartments", count: "5,000 properties" },
  { name: "Resorts", count: "2,000 properties" },
  { name: "Villas", count: "1,500 properties" },
  { name: "Guest Houses", count: "800 properties" },
];

const TABS = ['Cities', 'Regions', 'Places to stay'];

export default function PopularSaudiDestinations() {
  const [activeTab, setActiveTab] = useState(0);

  let displayedItems = [];
  if (activeTab === 0) {
    displayedItems = SAUDI_DESTINATIONS;
  } else if (activeTab === 1) {
    displayedItems = SAUDI_REGIONS;
  } else if (activeTab === 2) {
    displayedItems = SAUDI_PLACES_TO_STAY;
  }

  return (
    <section className="pb-10 pt-8">
      <div className="container">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[1.35rem] font-semibold">Popular destinations in Saudi Arabia</h2>
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  index === activeTab ? 'border-[#bcd6ff] bg-[#eaf2ff] text-link' : 'border-border text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {displayedItems.map((item) => (
            <div key={item.name}>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
