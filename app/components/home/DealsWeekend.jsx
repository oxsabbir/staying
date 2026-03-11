"use client";

import { useQuery } from "@tanstack/react-query";
import { FiHeart } from "react-icons/fi";
import PropertySlider from "../shared/PropertySlider";
import { fetchWeekendDeals } from "@/api/city";

const SkeletonItem = ({ className }) => (
  <div className={`animate-pulse rounded-sm bg-gray-200 ${className}`}></div>
);

export default function DealsWeekend() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["weekendDeals"],
    queryFn: fetchWeekendDeals,
  });

  if (error) return null;

  const properties = data || [];

  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex md:items-center flex-col md:flex-row items-start justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold">
            Deals for the weekend
          </h2>
          <span className="text-muted">
            Save 20% or more with early 2026 deals
          </span>
        </div>
        <div className="mt-4">
          {isLoading ? (
            <div className="grid grid-cols-4 gap-4">
              <SkeletonItem className="h-56" />
              <SkeletonItem className="h-56" />
              <SkeletonItem className="h-56" />
              <SkeletonItem className="h-56" />
            </div>
          ) : properties.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border p-8 text-center text-muted">
              No deals available at the moment.
            </div>
          ) : (
            <PropertySlider items={properties} navId="weekend-deals" />
          )}
        </div>
      </div>
    </section>
  );
}
