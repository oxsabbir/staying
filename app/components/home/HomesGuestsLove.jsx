"use client";

import { useQuery } from "@tanstack/react-query";
import { FiHeart } from "react-icons/fi";
import PropertySlider from "../shared/PropertySlider";
import { fetchHomesGuestsLove } from "@/api/city";

const SkeletonItem = ({ className }) => (
  <div className={`animate-pulse rounded-sm bg-gray-200 ${className}`}></div>
);

export default function HomesGuestsLove() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homesGuestsLove"],
    queryFn: fetchHomesGuestsLove,
  });

  if (error) return null;

  const properties = data || [];

  return (
    <section className="py-8">
      <div className="container">
        <h2 className="mb-4 text-[1.35rem] font-semibold">Homes guests love</h2>
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
              No homes available at the moment.
            </div>
          ) : (
            <PropertySlider items={properties} navId="homes-guests-love" />
          )}
        </div>
      </div>
    </section>
  );
}
