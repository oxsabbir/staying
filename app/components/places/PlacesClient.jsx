"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { FiChevronDown, FiHeart, FiMapPin } from "react-icons/fi";
import { roomData } from "../../../data/room_data";
const navPill =
  "rounded-full border border-primary/30 px-3 py-2 text-xs font-medium text-primary";

const formatPrice = (value) => `SAR ${value.toLocaleString("en-US")}`;

function Breadcrumbs({ place }) {
  return (
    <div className="text-xs text-muted">
      Home / {place.country} / {place.region} / {place.name} / Search results
    </div>
  );
}

function SearchBar({ place }) {
  return (
    <div className="mt-4 rounded-lg border border-accent/60 bg-white p-3 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
        <div className="flex items-center gap-2 rounded-md border border-accent/60 px-3 py-2">
          <FiMapPin className="text-primary" />
          <input
            className="w-full text-sm outline-none"
            defaultValue={place.name}
            aria-label="Destination"
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-accent/60 px-3 py-2">
          <span className="text-xs text-muted">{place.search.checkIn}</span>
          <span className="text-xs text-muted">—</span>
          <span className="text-xs text-muted">{place.search.checkOut}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-accent/60 px-3 py-2">
          <span className="text-xs text-muted">{place.search.guests}</span>
        </div>
        <button className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-primary">
          Search
        </button>
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
        <div className="text-sm font-semibold">Show on map</div>
        <div className="mt-3 overflow-hidden rounded-md border border-border">
          <img
            src={place.summary.mapImage}
            alt={`${place.name} map`}
            className="h-32 w-full object-cover"
          />
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
        Flexible booking for a static site. Filters update instantly with your
        local data.
      </div>
    </aside>
  );
}

function PropertyCard({ property }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <Link href={`/rooms/${property.id}`}>
          <div className="relative">
            <img
              src={property.image?.[0]}
              alt={property.name}
              className="h-52 w-full rounded-md object-cover sm:h-48 lg:h-44"
            />
            <button className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-primary shadow">
              <FiHeart />
            </button>
          </div>
        </Link>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-link sm:text-xl">
                {property.name}
              </h3>
              <span className={navPill}>{property.dealLabel}</span>
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
              {property.perks.map((perk) => (
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
                  {property.ratingLabel}
                </div>
                <div className="text-xs text-muted">
                  {property.reviewCount} reviews
                </div>
              </div>
              <div className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-white">
                {property.rating}
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

            <Link href={`/rooms/${property.id}`}>
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

export default function PlacesClient({ place }) {
  const properties = roomData.filter((p) => p.slug === place.slug) || [];
  const prices = useMemo(
    () => properties.map((property) => property.price),
    [properties],
  );
  const priceBounds = useMemo(
    () => ({ min: Math.min(...prices), max: Math.max(...prices) }),
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

  const filtered = useMemo(() => {
    const base = properties.filter((property) => {
      if (property.price > maxPrice) return false;
      if (freeCancellation && !property.perks.includes("Free cancellation"))
        return false;
      if (breakfastIncluded && !property.breakfastIncluded) return false;
      return true;
    });

    if (sortBy === "price") {
      return [...base].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "rating") {
      return [...base].sort((a, b) => b.rating - a.rating);
    }

    return [...base].sort((a, b) => a.rank - b.rank);
  }, [place.properties, maxPrice, freeCancellation, breakfastIncluded, sortBy]);

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
                  {place.name}: {roomData.length?.toLocaleString("en-US") || 0}{" "}
                  properties found
                </h1>
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-muted">
                  <span>Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="appearance-none rounded-md border border-border bg-white px-3 py-1 pr-7 text-xs"
                    >
                      <option value="top">Our top picks</option>roomData
                      <option value="price">Price (lowest first)</option>
                      <option value="rating">Rating (high to low)</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-2 top-2 h-3 w-3 text-muted" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-dashed border-border bg-subtle px-3 py-2 text-xs text-muted">
              {filtered.length} stays match your filters in {place.name}.
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}

            {filtered.length === 0 ? (
              <div className="rounded-lg border border-border bg-white p-6 text-center text-sm text-muted shadow-sm">
                No properties match those filters. Try clearing one of them.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
