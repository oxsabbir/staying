"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  FiChevronDown,
  FiHeart,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useSearchContext } from "../../context/SearchContext";
import { getPropertiesByCity } from "@/api/property";

const navPill =
  "rounded-full border border-primary/30 px-3 py-2 text-xs font-medium text-primary";

const formatPrice = (value) => `SAR ${value?.toLocaleString("en-US") || 0}`;

function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Total number of page items to show (excluding ellipses)

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages || totalPages === 0;

  return (
    <div className="mt-8 pt-8 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 border-t border-border/40">
      <Link
        href={isPreviousDisabled ? "#" : createPageURL(currentPage - 1)}
        className={`flex h-8 w-8 items-center justify-center rounded-md border border-border bg-white text-muted transition-colors hover:border-primary hover:text-primary ${
          isPreviousDisabled ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <FiChevronLeft size={16} />
      </Link>

      <div className="flex items-center gap-1">
        {getPageNumbers().length > 0 ? (
          getPageNumbers().map((pageNum, index) => {
            if (pageNum === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-8 items-center justify-center text-xs text-muted"
                >
                  ...
                </span>
              );
            }
            return (
              <Link
                key={pageNum}
                href={createPageURL(pageNum)}
                className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium transition-colors ${
                  currentPage === pageNum
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {pageNum}
              </Link>
            );
          })
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary bg-primary text-xs font-medium text-white">
            1
          </span>
        )}
      </div>

      <Link
        href={isNextDisabled ? "#" : createPageURL(currentPage + 1)}
        className={`flex h-8 w-8 items-center justify-center rounded-md border border-border bg-white text-muted transition-colors hover:border-primary hover:text-primary ${
          isNextDisabled ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <FiChevronRight size={16} />
      </Link>
    </div>
  );
}

function Breadcrumbs({ place }) {
  return (
    <div className="text-xs md:text-sm font-medium text-gray-700">
      Home / {place.country || "Saudi Arabia"} / {place.region || "Middle East"}{" "}
      / {place.name} / Search results
    </div>
  );
}

function SearchBar({ place }) {
  const { data } = useSearchContext();
  return (
    <div className="mt-4 rounded-lg border border-accent/60 bg-white p-3 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
        <div className="flex items-center gap-2 rounded-md border border-accent/60 px-3 py-2">
          <FiMapPin className="text-primary" />
          <p className="w-full text-sm outline-none" aria-label="Destination">
            {data.city || place.name}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-accent/60 px-3 py-2">
          <span className="text-sm ">Check In {data.checkIn || "Not set"}</span>
          <span className="text-sm ">—</span>
          <span className="text-sm ">
            Check Out {data.checkOut || "Not set"}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-accent/60 px-3 py-2">
          <span className="text-sm ">Total Guest : {data.totalGuest || 0}</span>
        </div>
      </div>
    </div>
  );
}

function Filters({
  place,
  maxPrice,
  onMaxPriceChange,
  freeCancellation,
  onFreeCancellationChange,
  breakfastIncluded,
  onBreakfastIncludedChange,
  priceBounds,
}) {
  return (
    <aside className="space-y-4">
      <div className="rounded-lg border border-border bg-white p-3 shadow-sm">
        <div className="h-[180px] rounded-xs ">
          {place.summary?.mapLink && (
            <iframe
              src={place.summary.mapLink}
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-white p-3 shadow-sm">
        <div className="text-sm font-semibold">Filter by</div>

        <div className="mt-4">
          <div className="text-xs font-semibold text-muted">
            Your budget (per night)
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span>{formatPrice(priceBounds.min)}</span>
            <span>{formatPrice(maxPrice)}</span>
          </div>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            className="mt-2 w-full accent-primary"
          />
        </div>

        <div className="mt-5 space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={freeCancellation}
              onChange={(event) =>
                onFreeCancellationChange(event.target.checked)
              }
            />
            Free cancellation
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={breakfastIncluded}
              onChange={(event) =>
                onBreakfastIncludedChange(event.target.checked)
              }
            />
            Breakfast included
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-white p-3 text-xs text-muted shadow-sm">
        Flexible booking. Filters update instantly based on available
        properties.
      </div>
    </aside>
  );
}

function PropertyCard({ property }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <Link href={`/rooms/${property.slug}`}>
          <div className="relative">
            <img
              src={property.image?.[0] || "/images/hotels/placeholder.jpg"}
              alt={property.name}
              className="h-52 w-full rounded-md object-cover sm:h-48 lg:h-44"
            />
          </div>
        </Link>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-link sm:text-xl">
                {property.name}
              </h3>
              {property.dealLabel && (
                <span className={navPill}>{property.dealLabel}</span>
              )}
              {property.genius ? (
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  Genius
                </span>
              ) : null}
            </div>
            <div className="mt-1 text-xs text-link">{property.area}</div>
            <div className="mt-1 text-xs text-muted">{property.distance}</div>

            <div className="mt-3 text-sm font-semibold">{property.type}</div>
            <div className="text-xs text-muted">{property.beds}</div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {property.perks?.map((perk) => (
                <span
                  key={perk}
                  className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start lg:flex-col lg:items-end">
            <div className="flex items-start justify-between gap-4 sm:w-full lg:w-auto">
              <div className="text-left sm:text-right">
                <div className="text-xs font-semibold text-muted">
                  {property.ratingLabel || "Rating"}
                </div>
                <div className="text-xs text-muted">
                  {property.reviewCount || 0} reviews
                </div>
              </div>
              <div className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-white">
                {property.rating || "0.0"}
              </div>
            </div>

            <div className="text-left sm:text-right">
              {property.oldPrice ? (
                <div className="text-xs text-red-500 line-through">
                  {formatPrice(property.oldPrice)}
                </div>
              ) : null}
              <div className="text-xl font-semibold sm:text-lg">
                {formatPrice(property.price)}
              </div>
              <div className="text-xs text-muted">
                Additional charges may apply
              </div>
            </div>

            <Link href={`/rooms/${property.slug}`}>
              <button className="w-full rounded-md bg-link px-4 py-2 text-sm font-semibold text-white sm:w-auto">
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlacesClient({
  place,
  initialProperties = [],
  initialPagination = {},
}) {
  const [properties, setProperties] = useState(initialProperties);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 15; // 15 properties per page

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const prices = useMemo(
    () => properties.map((property) => property.price || 0),
    [properties],
  );

  const priceBounds = useMemo(
    () => ({
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 1000,
    }),
    [prices],
  );

  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [breakfastIncluded, setBreakfastIncluded] = useState(false);
  const [sortBy, setSortBy] = useState("top");

  useEffect(() => {
    setMaxPrice(priceBounds.max);
    setFreeCancellation(false);
    setBreakfastIncluded(false);
    setSortBy("top");
  }, [priceBounds.max]);

  const fetchProperties = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const response = await getPropertiesByCity(place.slug, page, pageSize);
        const data = response.data.map((p) => {
          const attr = p.attributes || p;
          return {
            id: p.id,
            slug: attr.slug || p.documentId || p.id,
            name: attr.name,
            price: attr.price || 0,
            oldPrice: attr.discountPrice,
            rating: attr.Rating || attr.rating || 0,
            ratingLabel: attr.ratingLabel,
            reviewCount: attr.totalReview || attr.reviewCount || 0,
            distance: attr.distance,
            area: attr.address,
            type: attr.propertyType || attr.type,
            dealLabel: attr.dealType || attr.dealLabel,
            breakfastIncluded: attr.breakfast,
            perks:
              attr.specialPerks?.map((item) =>
                typeof item === "string" ? item : item.item,
              ) || [],
            image: [
              attr.coverImage?.url || attr.coverImage?.data?.attributes?.url,
              ...(attr.images?.map((img) => img.url || img.attributes?.url) ||
                []),
            ].filter(Boolean),
            rank: attr.rank || 0,
          };
        });
        setProperties(data);
        setPagination(response.meta?.pagination || {});
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [place.slug],
  );

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage, fetchProperties]);

  const filtered = useMemo(() => {
    const base = properties.filter((property) => {
      if ((property.price || 0) > maxPrice) return false;
      if (freeCancellation && !property.perks?.includes("Free cancellation"))
        return false;
      if (breakfastIncluded && !property.breakfastIncluded) return false;
      return true;
    });

    if (sortBy === "price") {
      return [...base].sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    if (sortBy === "rating") {
      return [...base].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return [...base].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  }, [properties, maxPrice, freeCancellation, breakfastIncluded, sortBy]);

  return (
    <main className="container-wide pb-12 pt-6">
      <Breadcrumbs place={place} />
      <SearchBar place={place} />

      <div className="mt-6 grid gap-6 sticky top-2 lg:grid-cols-[280px_1fr]">
        <Filters
          place={place}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          freeCancellation={freeCancellation}
          onFreeCancellationChange={setFreeCancellation}
          breakfastIncluded={breakfastIncluded}
          onBreakfastIncludedChange={setBreakfastIncluded}
          priceBounds={priceBounds}
        />

        <section className="space-y-4">
          <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold">
                  {place.name}: {pagination.total || 0} properties found
                </h1>
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-muted">
                  <span>Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="appearance-none rounded-md border border-border bg-white px-3 py-1 pr-7 text-xs"
                    >
                      <option value="top">Our top picks</option>
                      <option value="price">Price (lowest first)</option>
                      <option value="rating">Rating (high to low)</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-2 top-2 h-3 w-3 text-muted" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-dashed border-border bg-subtle px-3 py-2 text-xs text-muted">
              {pagination.total || 0} stays match your filters in {place.name}.
            </div>
          </div>

          <div className="space-y-4 min-h-[400px]">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <>
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}

                {filtered.length === 0 ? (
                  <div className="rounded-lg border border-border bg-white p-6 text-center text-sm text-muted shadow-sm">
                    No properties match those filters. Try clearing one of them.
                  </div>
                ) : null}

                {pagination.pageCount > 1 && filtered.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.pageCount}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
