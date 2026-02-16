"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiCalendar,
  FiCheck,
  FiMapPin,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { useSearchContext } from "../../context/SearchContext";

const SAUDI_CITIES = ["Riyadh", "Jeddah", "Mecca", "Medina", "AlUla", "Tabuk"];

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

export default function HeroSearch({
  isReserving,
  roomName,
  roomUrl,
  fixedCity,
  hideLocationField = false,
  defaultOneNight = false,
}) {
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
  const { updateData, data } = useSearchContext();

  // Add useEffect to pre-fill form fields when isReserving is true and data is available
  useEffect(() => {
    if (isReserving && data) {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const tomorrowDate = new Date(todayDate);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      const formatIso = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      };

      setCity(fixedCity || data.city || SAUDI_CITIES[0]);
      setCheckIn(data.checkIn || (defaultOneNight ? formatIso(todayDate) : ""));
      setCheckOut(
        data.checkOut || (defaultOneNight ? formatIso(tomorrowDate) : ""),
      );
      setGuests(data.guests || { adults: 2, children: 0, rooms: 1 });
    }
  }, [isReserving, data, fixedCity, defaultOneNight]);

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
    const selectedDateObj = new Date(calendar.year, calendar.month, day);
    selectedDateObj.setHours(0, 0, 0, 0); // Normalize to start of day

    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    todayDateOnly.setHours(0, 0, 0, 0); // Normalize to start of day

    if (selectedDateObj < todayDateOnly) {
      // If the selected date is in the past, do nothing
      return;
    }

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
      setCheckOut(""); // Clear checkout if checkIn is set to a date before current checkIn
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
    updateData({
      city: city,
      checkIn,
      checkOut,
      totalGuest: guests.adults + guests.children,
      guests: guests,
    });
    router.push(`/places/${citySlug}`);
  };

  const handleApplyChange = (event) => {
    event.preventDefault();
    updateData({
      city,
      checkIn,
      checkOut,
      totalGuest: guests.adults + guests.children,
      guests,
    });
  };

  return (
    <section
      className={`bg-primary  text-white ${isReserving ? "py-4 pb-6" : "py-9"}`}
    >
      <div id="hero-search" className="container relative ">
        {isReserving && (
          <h1 className="text-[clamp(2rem,3vw,2.8rem)] font-bold">
            Reserve Your Stay
          </h1>
        )}
        {!isReserving && (
          <>
            <h1 className="text-[clamp(2rem,3vw,2.8rem)] font-bold">
              Find your next stay
            </h1>
            <p className="mt-3 text-white/85">
              Search deals on hotels, homes, and much more...
            </p>
          </>
        )}
        <div
          className={`${!isReserving ? "absolute top-[100px] right-0 container w-full mx-auto" : ""}`}
        >
          <form
            onSubmit={isReserving ? handleApplyChange : handleSubmit}
            className={`mt-6 grid  gap-x-1 gap-y-1 rounded-sm border-2 border-accent bg-accent p-[2px] ${
              hideLocationField
                ? "xl:grid-cols-[1.2fr_1fr_auto]"
                : "xl:grid-cols-[1fr_1fr_1fr_auto]"
            }`}
          >
            {!hideLocationField ? (
              <div className="relative flex min-h-[52px] items-center gap-2 rounded-sm bg-white px-3 py-2 text-muted">
                <FiMapPin size={24} />
                {isReserving ? (
                  <div className="w-full text-text">{city}</div>
                ) : (
                  <>
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
                      <div className="absolute left-0 top-full z-20 mt-3 w-[280px] max-h-[400px] overflow-auto rounded-md border border-border bg-white p-3 text-text shadow-lg">
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
                                <p className="text-xs text-muted">
                                  Saudi Arabia
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
            <div className="relative flex min-h-[52px] items-center gap-2 rounded-sm bg-white px-3 py-2 text-muted">
              <FiCalendar size={24} />
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
                <div className="absolute left-0 top-full z-20 mt-3 w-[320px] rounded-md border border-border bg-white p-3 text-text shadow-lg">
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
                      const selectedDateObj = new Date(
                        calendar.year,
                        calendar.month,
                        day,
                      );
                      selectedDateObj.setHours(0, 0, 0, 0); // Normalize to start of day
                      const todayDateOnly = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                      );
                      todayDateOnly.setHours(0, 0, 0, 0); // Normalize to start of day
                      const isPastDate = selectedDateObj < todayDateOnly;

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
                          } ${isPastDate ? "cursor-not-allowed opacity-50" : ""}`}
                          disabled={isPastDate}
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
            <div className="relative flex min-h-[52px]  items-start gap-2 rounded-sm bg-white px-3 py-2 text-muted">
              <FiUsers className="mt-1" size={24} />
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((current) =>
                    current === "guests" ? null : "guests",
                  )
                }
                className="flex w-full items-center  h-full justify-between text-left text-text"
              >
                <span className="flex items-center  h-full">
                  {guests.adults} adults · {guests.children} children ·{" "}
                  {guests.rooms} room
                </span>
                <span className="text-xs text-muted">▾</span>
              </button>
              {openDropdown === "guests" && (
                <div className="absolute left-0 top-full z-20 mt-3 w-[260px] rounded-md border border-border bg-white p-4 text-text shadow-lg">
                  <RoomGuestSelector
                    value={guests}
                    onChange={setGuests}
                    onDone={() => setOpenDropdown(null)}
                  />

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
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-link px-4 py-3 font-semibold text-white"
            >
              {isReserving ? (
                <>
                  <FiCheck className="text-lg" size={24} />
                  Apply change
                </>
              ) : (
                <>
                  <FiSearch />
                  Search
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
