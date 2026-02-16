"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiClock,
  FiLock,
  FiMapPin,
  FiNavigation,
  FiPhoneCall,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { HeaderNav, SiteFooter } from "../components/home";
import Accordion from "../components/shared/Accordion";
import AutocompleteInput from "../components/shared/AutocompleteInput";

const navLinks = [
  "Stays",
  "Flights",
  "Car rentals",
  "Attractions",
  "Airport taxis",
];

const featureCards = [
  {
    title: "Flight tracking",
    body: "Your driver will track your flight and wait if you're delayed.",
    icon: FiNavigation,
  },
  {
    title: "One clear price",
    body: "Your price is confirmed upfront — no extra costs, no cash required.",
    icon: FiLock,
  },
  {
    title: "Tried and true service",
    body: "We work with professional drivers and have 24/7 customer care.",
    icon: FiShield,
  },
];

const processSteps = [
  {
    title: "Booking your airport taxi",
    body: "Confirmation is immediate. Cancel for free up to 24 hours before pickup.",
    icon: FiClock,
  },
  {
    title: "Meeting your driver",
    body: "You’ll be met on arrival and taken to your vehicle. Your driver tracks your flight.",
    icon: FiPhoneCall,
  },
  {
    title: "Arriving at your destination",
    body: "Get to your destination quickly and safely — no long taxi lines.",
    icon: FiMapPin,
  },
];

const taxiCards = [
  {
    name: "Standard",
    subtitle: "Volkswagen Jetta or similar",
    passengers: "3 passengers",
    bags: "2 standard bags",
  },
  {
    name: "Full-size sedan",
    subtitle: "Mercedes-Benz E-Class or similar",
    passengers: "3 passengers",
    bags: "2 standard bags",
  },
];

const faqs = [
  {
    title: "What if my flight is early or delayed?",
    body: "We track your flight and adjust pick-up times automatically, so your driver is there when you land.",
  },
  {
    title: "What's included in the price?",
    body: "All taxes, fees, and meet & greet service are included. No hidden charges at pickup.",
  },
  {
    title: "How do I pay?",
    body: "Pay online with your card. The total price is confirmed upfront.",
  },
  {
    title: "Can I cancel my booking?",
    body: "Yes, free cancellation is available up to 24 hours before pickup.",
  },
];

const faqsLeft = faqs.slice(0, 2);
const faqsRight = faqs.slice(2);

function toMinutes(hour, minute) {
  return Number(hour) * 60 + Number(minute);
}

function formatDateTime(value) {
  if (!value?.date) return "Not selected";
  return `${new Date(value.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })}, ${value.hour}:${value.minute}`;
}

function clampDateTimeToMin(value, minValue, forceOnEmpty = true) {
  if (!minValue?.date) return value;
  if (!value.date || value.date < minValue.date) {
    if (!value.date && !forceOnEmpty) return value;
    return {
      ...value,
      date: minValue.date,
      hour: minValue.hour,
      minute: minValue.minute,
    };
  }
  if (value.date === minValue.date) {
    if (
      toMinutes(value.hour, value.minute) <
      toMinutes(minValue.hour, minValue.minute)
    ) {
      return { ...value, hour: minValue.hour, minute: minValue.minute };
    }
  }
  return value;
}

function DateTimeDropdown({
  value,
  onChange,
  minValue,
  placeholder,
  timeLabel,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const cells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const mondayStart = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const all = [];
    for (let i = 0; i < mondayStart; i += 1) all.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) all.push(day);
    return all;
  }, [viewDate]);

  const toIsoDate = (day) => {
    const y = viewDate.getFullYear();
    const m = String(viewDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const label = value.date
    ? `${new Date(value.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}, ${value.hour}:${value.minute}`
    : placeholder;

  return (
    <div className="relative w-full ">
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`flex w-full items-center gap-2 text-base ${
          disabled ? "cursor-not-allowed text-muted/60" : "text-muted"
        }`}
      >
        <FiClock className="text-primary" size={20} />
        <span className="truncate">{label}</span>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-40 w-[280px] rounded-md border border-border bg-[#ecebf5] p-3 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-white text-link"
            >
              ‹
            </button>
            <span className="text-sm font-semibold text-[#1d1b35]">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-link bg-white text-link"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#6c6887]">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {cells.map((day, i) =>
              day ? (
                <button
                  key={`${viewDate.getMonth()}-${day}`}
                  type="button"
                  onClick={() =>
                    onChange(
                      clampDateTimeToMin(
                        { ...value, date: toIsoDate(day) },
                        minValue,
                      ),
                    )
                  }
                  disabled={Boolean(
                    minValue?.date && toIsoDate(day) < minValue.date,
                  )}
                  className={`h-8 rounded-sm text-sm ${
                    value.date === toIsoDate(day)
                      ? "bg-link text-white"
                      : "text-[#353254] hover:bg-white/80"
                  } ${
                    minValue?.date && toIsoDate(day) < minValue.date
                      ? "cursor-not-allowed opacity-40"
                      : ""
                  }`}
                >
                  {day}
                </button>
              ) : (
                <span key={`blank-${i}`} className="h-8" />
              ),
            )}
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm text-[#1d1b35]">{timeLabel}</p>
            <div className="flex gap-2">
              <select
                value={value.hour}
                onChange={(e) =>
                  onChange(
                    clampDateTimeToMin(
                      { ...value, hour: e.target.value },
                      minValue,
                    ),
                  )
                }
                className="w-full rounded-sm border border-border bg-white px-2 py-1.5 text-sm"
              >
                {Array.from({ length: 24 }, (_, i) =>
                  String(i).padStart(2, "0"),
                ).map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={value.minute}
                onChange={(e) =>
                  onChange(
                    clampDateTimeToMin(
                      { ...value, minute: e.target.value },
                      minValue,
                    ),
                  )
                }
                className="w-full rounded-sm border border-border bg-white px-2 py-1.5 text-sm"
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AirportTaxisPage() {
  const getNowRounded = () => {
    const now = new Date();
    const mins = now.getMinutes();
    const rounded = Math.ceil(mins / 15) * 15;
    now.setMinutes(rounded, 0, 0);
    if (rounded === 60) {
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
    }
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate(),
    ).padStart(2, "0")}`;
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    return { date, hour, minute };
  };

  const minPickup = useMemo(() => getNowRounded(), []);
  const [tripType, setTripType] = useState("one-way");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [riders, setRiders] = useState(2);
  const [pickupDateTime, setPickupDateTime] = useState({
    date: minPickup.date,
    hour: minPickup.hour,
    minute: minPickup.minute,
  });
  const [returnDateTime, setReturnDateTime] = useState({
    date: "",
    hour: pickupDateTime.hour,
    minute: pickupDateTime.minute,
  });
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966576033238";

  const isFormValid =
    pickupLocation.trim().length > 0 &&
    destination.trim().length > 0 &&
    pickupDateTime.date;

  const handleBookNow = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    const message = [
      "Assalamu Alaikum, I want to book an airport taxi.",
      "",
      `Trip type: ${tripType === "one-way" ? "One-way" : "Return"}`,
      `Pick-up location: ${pickupLocation}`,
      `Destination: ${destination}`,
      `Pick-up date/time: ${formatDateTime(pickupDateTime)}`,
      `Return date/time: ${
        returnDateTime.date ? formatDateTime(returnDateTime) : "Not added"
      }`,
      `Riders: ${riders}`,
      "",
      "Please confirm availability and final total fare.",
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#f3f5fa] text-text">
      <HeaderNav navLinks={navLinks} />

      <main className="container pb-16 pt-8 text-[15px] sm:text-[16px]">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold">Book your airport taxi</h1>
          <p className="mt-2 text-base text-muted">
            Easy transportation between the airport and your accommodations
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-base">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trip"
                checked={tripType === "one-way"}
                onChange={() => {
                  setTripType("one-way");
                  setReturnDateTime((prev) => ({ ...prev, date: "" }));
                }}
              />
              One-way
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trip"
                checked={tripType === "return"}
                onChange={() => setTripType("return")}
              />
              Return
            </label>
          </div>

          <form
            onSubmit={handleBookNow}
            className="mt-4 grid gap-[4px] rounded-md border-2 border-accent bg-accent p-[2px] lg:grid-cols-4"
          >
            <div className="flex min-h-[54px] items-center gap-2 rounded-sm bg-white px-3 py-2 lg:col-span-2 lg:col-start-1 lg:row-start-1">
              <AutocompleteInput
                placeholder="Enter pick-up location"
                value={pickupLocation}
                onChange={setPickupLocation}
                onSelect={setPickupLocation}
                required
              />
            </div>
            <div className="flex min-h-[54px] items-center gap-2 rounded-sm bg-white px-3 py-2 lg:col-start-3 lg:row-start-1">
              <AutocompleteInput
                placeholder="Enter destination"
                value={destination}
                onChange={setDestination}
                onSelect={setDestination}
                required
              />
            </div>
            <div className="min-h-[54px] flex items-center   rounded-sm bg-white px-3 py-2 lg:col-start-1 lg:row-start-2">
              <DateTimeDropdown
                value={pickupDateTime}
                onChange={(next) => {
                  const fixedPickup = clampDateTimeToMin(next, minPickup);
                  setPickupDateTime(fixedPickup);
                  setReturnDateTime((prev) =>
                    clampDateTimeToMin(prev, fixedPickup, false),
                  );
                }}
                minValue={minPickup}
                placeholder="Pick-up date, time"
                timeLabel="Pick up time"
              />
            </div>
            <div className="min-h-[54px]  flex items-center  rounded-sm bg-white px-3 py-2 lg:col-start-2 lg:row-start-2">
              <DateTimeDropdown
                value={returnDateTime}
                onChange={(next) =>
                  setReturnDateTime(
                    clampDateTimeToMin(next, pickupDateTime, false),
                  )
                }
                minValue={pickupDateTime}
                placeholder="Add Return time"
                timeLabel="Return time"
              />
            </div>
            <div className="flex min-h-[54px] items-center gap-2 rounded-sm bg-white px-3 py-2 text-base lg:col-start-3 lg:row-start-2">
              <FiUser className="text-primary" size={20} />
              <select
                value={riders}
                onChange={(e) => setRiders(Number(e.target.value))}
                className="w-full bg-transparent text-sm outline-none"
              >
                {Array.from({ length: 16 }, (_, i) => i + 1).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`min-h-[54px] rounded-sm px-6 py-2 text-base font-semibold text-white lg:col-start-4 lg:row-start-1 lg:row-span-2 ${
                isFormValid ? "bg-link" : "bg-link cursor-not-allowed"
              }`}
            >
              Book now
            </button>
          </form>
        </section>

        <section className="mt-10 grid gap-6 rounded-lg bg-[#eaf0fb] p-4 text-base md:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="flex gap-4 rounded-lg border border-border bg-white p-4 shadow-sm"
            >
              <div className="flex h-10 w-10  items-center justify-center rounded-full bg-primary/10 text-primary">
                {<card.icon size={24} />}
              </div>
              <div>
                <div className="font-semibold text-[15px]">{card.title}</div>
                <p className="mt-1 text-sm text-muted">{card.body}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="container pt-[400px] md:pt-[300px] xl:pt-10">
          <h2 className="text-4xl font-bold">Travel more, spend less</h2>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-white p-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">Book Now, save money</h3>
              <p className="mt-1 text-muted">
                Save 10% on select rental cars with partner offers
              </p>
              <div className="mt-3 flex gap-3">
                <button className="rounded-sm bg-link px-4 py-2 text-sm font-semibold text-white">
                  Call Us
                </button>
                <button className="rounded-sm border border-border px-4 py-2 text-sm font-semibold text-link">
                  Learn More
                </button>
              </div>
            </div>
            <div className="rounded-lg bg-[#eef5ff] p-3">
              <span className="inline-block rounded-md bg-link px-3 py-2 text-sm font-bold text-white">
                Genius
              </span>
            </div>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-center">
            Airport transportation made easy
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              {processSteps.map((step) => (
                <div
                  key={step.title}
                  className="flex gap-3 rounded-lg border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {<step.icon size={24} />}
                  </div>
                  <div>
                    <div className="text-base font-semibold">{step.title}</div>
                    <p className="mt-1 text-sm text-muted">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border text-center text-base text-muted">
              <img
                src="/images/taxi-how-it-works.png"
                alt="how-it-works"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Airport taxis for any kind of trip
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {taxiCards.map((card) => (
              <div
                key={card.name}
                className="rounded-lg border border-border bg-white p-4 shadow-sm"
              >
                <div className="text-base font-semibold">{card.name}</div>
                <div className="text-sm text-muted">{card.subtitle}</div>
                <div className="mt-3 space-y-2 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <FiUser /> {card.passengers}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck /> {card.bags}
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <FiCheck /> Meet & greet included
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <FiCheck /> Free cancellation
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Learn more about our airport taxi service
          </h2>
          <p className="mt-2 text-sm text-muted">
            See more FAQs on our help page
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Accordion items={faqsLeft} />
            <Accordion items={faqsRight} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
