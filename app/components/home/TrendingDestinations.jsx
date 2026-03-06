"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchCities } from "@/api/city";

const SkeletonItem = ({ className }) => (
  <div className={`animate-pulse rounded-sm bg-gray-200 ${className}`}></div>
);

export default function TrendingDestinations() {
  const {
    data: cities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  if (error) return null; // Or handle error gracefully

  const destinations =
    cities?.map((city) => ({
      name: city.name || city.attributes?.name,
      link: `/places/${city.name?.toLowerCase() || city.attributes?.slug}`,
      image: `${process.env.NEXT_PUBLIC_API_URL}${city.coverImage?.url || city.attributes?.coverImage?.data?.attributes?.url || "/images/placeholder.jpg"}`,
    })) || [];

  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Trending destinations</h2>
        </div>

        <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-2">
          {isLoading ? (
            <>
              <SkeletonItem className="col-span-2 h-[160px] md:h-[260px] max-[640px]:col-span-1" />
              <SkeletonItem className="col-span-2 h-[160px] md:h-[260px] max-[640px]:col-span-1" />
              <SkeletonItem className="h-[160px]" />
              <SkeletonItem className="h-[160px]" />
              <SkeletonItem className="h-[160px]" />
              <SkeletonItem className="h-[160px]" />
            </>
          ) : (
            destinations.map((dest, index) => (
              <div
                key={dest.name || index}
                className={`relative overflow-hidden rounded-sm bg-cover bg-center ${
                  index < 2
                    ? "col-span-2 h-[160px] md:h-[260px] max-[640px]:col-span-1"
                    : "h-[160px]"
                }`}
                style={{ backgroundImage: `url(${dest.image})` }}
              >
                <Link href={dest.link}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00000084] to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow">
                    <h3 className="font-semibold">{dest.name}</h3>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
