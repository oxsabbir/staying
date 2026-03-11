"use client";

import { useQuery } from "@tanstack/react-query";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { fetchRecommendedProperties } from "@/api/city";

const SkeletonItem = ({ className }) => (
  <div className={`animate-pulse rounded-sm bg-gray-200 ${className}`}></div>
);

export default function PropertyHighlights() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendedProperties"],
    queryFn: fetchRecommendedProperties,
  });
  console.log(data);

  if (error) return null;

  const properties = data || [];

  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold">
            Recommended properties
          </h2>
          <button className="flex items-center gap-1 text-link"></button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
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
          <div className="grid gap-4 md:grid-cols-2">
            {properties.map((card) => {
              const attr = card.attributes || card;
              const imageUrl =
                attr.coverImage?.url ||
                attr.image?.[0] ||
                "/images/hotels/placeholder.jpg";
              const slug = attr.slug || card.slug || card.documentId || card.id;

              return (
                <Link key={card.id || attr.name} href={`/rooms/${slug}`}>
                  <div className="overflow-hidden rounded-sm border border-border bg-bg shadow-1">
                    <div
                      className="h-56 bg-cover bg-center"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{attr.name}</h3>
                      <p className="my-2 text-sm text-muted">
                        {attr.address || attr.area || attr.city?.name || "Saudi Arabia"}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-xs bg-primary px-1.5 py-0.5 text-white">
                          {attr.Rating || attr.rating || "8.5"}
                        </span>
                        <span>
                          {attr.ratingLabel || "Excellent"} ·{" "}
                          {attr.totalReview || attr.reviewCount || 0} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
