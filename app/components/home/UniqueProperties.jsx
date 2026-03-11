"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUniqueProperties } from "@/api/city";
import PropertySlider from "../shared/PropertySlider";

const SkeletonItem = ({ className }) => (
  <div className={`animate-pulse rounded-sm bg-gray-200 ${className}`}></div>
);

export default function UniqueProperties() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["uniqueProperties"],
    queryFn: fetchUniqueProperties,
  });

  if (error) return null;

  const properties = data || [];

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
          {isLoading ? (
            <div className="grid grid-cols-4 gap-4">
              <SkeletonItem className="h-56" />
              <SkeletonItem className="h-56" />
              <SkeletonItem className="h-56" />
              <SkeletonItem className="h-56" />
            </div>
          ) : properties.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border p-8 text-center text-muted">
              No properties available at the moment.
            </div>
          ) : (
            <PropertySlider items={properties} navId="unique-properties" />
          )}
        </div>
      </div>
    </section>
  );
}
