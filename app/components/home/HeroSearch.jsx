"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCalendar, FiMapPin, FiSearch, FiUsers } from "react-icons/fi";

const SAUDI_CITIES = [
  "Riyadh",
  "Jeddah",
  "Mecca",
  "Medina",
  "Dammam",
  "Al Khobar",
  "Taif",
  "Abha",
  "Tabuk",
  "AlUla",
];

const TRENDING_DESTINATIONS = [
  { city: "Jeddah", country: "Saudi Arabia" },
  { city: "Mecca", country: "Saudi Arabia" },
  { city: "Medina", country: "Saudi Arabia" },
  { city: "Dammam", country: "Saudi Arabia" },
  { city: "AlUla", country: "Saudi Arabia" },
];

function RoomGuestSelector({ value, onChange, onDone }) {
  const updateValue = (field, delta) => {
    const nextValue = {
      ...value,
      [field]: Math.max(0, value[field] + delta),
    };
    if (field === "adults" || field === "rooms") {
      nextValue[field] = Math.max(1, nextValue[field]);
    }
    onChange(nextValue);
  };

  return (
    <div className="flex w-full  flex-col gap-4 text-text">
      <div className="space-y-3">
        {[
          { label: "Adults", field: "adults" },
          { label: "Children", field: "children" },
          { label: "Rooms", field: "rooms" },
        ].map((item) => (
          <div
            key={item.field}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted">{item.label}</span>
            <div className="flex items-center rounded-sm border border-border">
              <button
                type="button"
                className="h-8 w-8 text-base text-muted disabled:text-muted/40"
                onClick={() => updateValue(item.field, -1)}
                disabled={
                  value[item.field] === (item.field === "children" ? 0 : 1)
                }
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-semibold text-text">
                {value[item.field]}
              </span>
              <button
                type="button"
                className="h-8 w-8 text-base text-link"
                onClick={() => updateValue(item.field, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onDone}
        className="rounded-sm border border-link px-3 py-2 text-sm font-semibold text-link"
      >
        Done
      </button>
    </div>
  );
}

export default function HeroSearch() {
  const [city, setCity] = useState(SAUDI_CITIES[0]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [travelingWithPets, setTravelingWithPets] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter();

  const today = useMemo(() => new Date(), []);
  const calendar = useMemo(() => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startWeekday; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(day);
    }
    return { year, month, cells };
  }, [today]);

  const monthLabel = new Date(
    calendar.year,
    calendar.month,
    1,
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const toIsoDate = (day) => {
    const month = String(calendar.month + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");
    return `${calendar.year}-${month}-${date}`;
  };

  const handleDaySelect = (day) => {
    const isoDate = toIsoDate(day);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(isoDate);
      setCheckOut("");
      return;
    }
    if (isoDate >= checkIn) {
      setCheckOut(isoDate);
    } else {
      setCheckIn(isoDate);
    }
  };

  const formatRangeLabel = () => {
    if (!checkIn && !checkOut) {
      return "Check-in date — Check-out date";
    }
    const format = (value) =>
      new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    if (checkIn && checkOut) {
      return `${format(checkIn)} - ${format(checkOut)}`;
    }
    return `${format(checkIn)} - Select end date`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const citySlug = city.toLowerCase().replace(/\s+/g, "-");
    router.push(`/places/${citySlug}`);
  };

  return (
    <section className="bg-primary text-white py-9">
      <div className="container">
        <h1 className="text-[clamp(2rem,3vw,2.8rem)] font-bold">
          Find your next stay
        </h1>
        <p className="mt-3 text-white/85">
          Search deals on hotels, homes, and much more...
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col items-center justify-between gap-4 rounded-sm border-4 border-accent bg-white lg:flex-row"
        >
          <div className="relative flex md:w-8/12 w-full items-center gap-2 border-r border-border p-3 text-muted max-[960px]:border-b  max-[960px]:border-r-0">
            <FiMapPin />
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((current) =>
                  current === "city" ? null : "city",
                )
              }
              className="flex w-full items-center justify-between text-left text-text"
            >
              <span>{city}</span>
              <span className="text-xs text-muted">▾</span>
            </button>
            {openDropdown === "city" && (
              <div className="absolute left-3 top-full z-20 mt-3 w-[280px] max-h-[400px] overflow-auto rounded-md border border-border bg-white p-3 text-text shadow-lg">
                {/* <div className="mb-3">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Your recent searches
                  </p>
                  <div className="mt-2 rounded-sm border border-border p-2">
                    {RECENT_SEARCHES.map((item) => (
                      <button
                        key={item.city}
                        type="button"
                        className="flex w-full items-start gap-2 text-left text-sm"
                        onClick={() => {
                          setCity(item.city);
                          setOpenDropdown(null);
                        }}
                      >
                        <FiMapPin className="mt-0.5 text-muted" />
                        <div>
                          <p className="font-semibold">{item.city}</p>
                          <p className="text-xs text-muted">{item.meta}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div> */}
                <p className="text-xs font-semibold uppercase text-muted">
                  Trending destinations
                </p>
                <div className="mt-2 rounded-sm border border-border">
                  {SAUDI_CITIES.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      className={`flex w-full items-center gap-2 px-2 py-2 text-left text-sm ${
                        index !== SAUDI_CITIES.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                      onClick={() => {
                        setCity(item);
                        setOpenDropdown(null);
                      }}
                    >
                      <FiMapPin className="text-muted" />
                      <div>
                        <p className="font-semibold">{item}</p>
                        <p className="text-xs text-muted">Saudi Arabia</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative w-full  flex items-center gap-2 border-r border-border p-3 text-muted max-[960px]:border-b max-[960px]:border-r-0">
            <FiCalendar />
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((current) =>
                  current === "date" ? null : "date",
                )
              }
              className="flex w-full items-center justify-between text-left text-text"
            >
              <span>{formatRangeLabel()}</span>
              <span className="text-xs text-muted">▾</span>
            </button>
            {openDropdown === "date" && (
              <div className="absolute left-3 top-full z-20 mt-3 w-[320px] rounded-md border border-border bg-white p-3 text-text shadow-lg">
                <div className="text-center text-xs font-semibold uppercase text-link">
                  Calendar
                </div>
                <div className="my-2 h-px bg-link/30" />
                <div className="text-center text-sm font-semibold">
                  {monthLabel}
                </div>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-muted">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {calendar.cells.map((day, index) => {
                    if (!day) {
                      return <span key={`blank-${index}`} className="h-8" />;
                    }
                    const isoDate = toIsoDate(day);
                    const isStart = checkIn === isoDate;
                    const isEnd = checkOut === isoDate;
                    const isInRange =
                      checkIn &&
                      checkOut &&
                      isoDate > checkIn &&
                      isoDate < checkOut;
                    return (
                      <button
                        key={isoDate}
                        type="button"
                        onClick={() => handleDaySelect(day)}
                        className={`h-8 rounded-sm text-sm ${
                          isStart || isEnd
                            ? "bg-link text-white"
                            : isInRange
                              ? "bg-link/10 text-link"
                              : "text-text hover:bg-link/10"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="rounded-full border border-link px-2 py-1 text-link">
                    Exact dates
                  </span>
                  <span className="rounded-full border border-border px-2 py-1">
                    + 1 day
                  </span>
                  <span className="rounded-full border border-border px-2 py-1">
                    + 2 days
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative w-full  flex items-start gap-2 border-r border-border p-3 text-muted max-[960px]:border-b max-[960px]:border-r-0">
            <FiUsers className="mt-1" />
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((current) =>
                  current === "guests" ? null : "guests",
                )
              }
              className="flex w-full items-center justify-between text-left text-text"
            >
              <span>
                {guests.adults} adults · {guests.children} children ·{" "}
                {guests.rooms} room
              </span>
              <span className="text-xs text-muted">▾</span>
            </button>
            {openDropdown === "guests" && (
              <div className="absolute left-3 top-full z-20 mt-3 w-[260px] rounded-md border border-border bg-white p-4 text-text shadow-lg">
                <RoomGuestSelector
                  value={guests}
                  onChange={setGuests}
                  onDone={() => setOpenDropdown(null)}
                />
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
                  <span>Traveling with pets?</span>
                  <button
                    type="button"
                    onClick={() => setTravelingWithPets((prev) => !prev)}
                    className={`relative h-5 w-9 rounded-full transition ${
                      travelingWithPets ? "bg-link" : "bg-border"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                        travelingWithPets ? "left-4" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-muted">
                  Assistance animals are not considered pets.
                </p>
                <button
                  type="button"
                  className="mt-3 text-xs font-semibold text-link"
                >
                  Read more about traveling with assistance animals
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="flex md:w-8/12 w-full  py-3 rounded-sm items-center justify-center gap-2 bg-link font-semibold text-white max-[960px]:p-3"
          >
            <FiSearch />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
