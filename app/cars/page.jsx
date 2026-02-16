"use client";

import { useState } from "react";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { HeaderNav, SiteFooter } from "../components/home";
import Accordion from "../components/shared/Accordion";
import AutocompleteInput from "../components/shared/AutocompleteInput";
import { DateRangeDropdown } from "../components/shared/BookingDropdowns";

const faqItems = [
  {
    title: "Why should I book a car rental with Staying.com?",
    body: "You get competitive rates, clear terms, and support from our team from booking to drop-off.",
  },
  {
    title: "What do I need to rent a car?",
    body: "Most rentals require a valid driver license, passport or ID, and a payment card under the driver name.",
  },
  {
    title: "Am I old enough to rent a car?",
    body: "Age rules vary by supplier, but many companies accept drivers from 21 years old with conditions.",
  },
  {
    title: "Can I book a rental car for someone else?",
    body: "Yes, but the main driver must match booking details and present valid documents at pick-up.",
  },
  {
    title: "Any tips for picking the right car?",
    body: "Choose based on trip distance, number of travelers, luggage needs, and fuel preference.",
  },
  {
    title: "Are all fees included in the rental price?",
    body: "Base pricing is included. Extras like child seats, additional drivers, or toll tags may cost more.",
  },
];

const topLinks = [
  "Countries",
  "Regions",
  "Cities",
  "Districts",
  "Airports",
  "Hotels",
  "Places of interest",
  "Vacation homes",
  "Apartments",
  "Resorts",
  "Villas",
  "Hostels",
  "All destinations",
  "Discover monthly stays",
];

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour24 = Math.floor(index / 2);
  const minute = index % 2 === 0 ? "00" : "30";
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minute} ${suffix}`;
});

export default function CarRentalPage() {
  const [form, setForm] = useState({
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "10:00 AM",
    dropoffDate: "",
    dropoffTime: "10:00 AM",
  });

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801000000000";

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBookNow = (e) => {
    e.preventDefault();

    const message = [
      "Hello Staying.com team, I would like to book a car rental.",
      "",
      `Pick-up location: ${form.pickupLocation || "Not provided"}`,
      `Pick-up date: ${form.pickupDate || "Not provided"}`,
      `Pick-up time: ${form.pickupTime || "Not provided"}`,
      `Drop-off date: ${form.dropoffDate || "Not provided"}`,
      `Drop-off time: ${form.dropoffTime || "Not provided"}`,
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const leftFaqs = faqItems.slice(0, 3);
  const rightFaqs = faqItems.slice(3);

  return (
    <div className="min-h-screen  bg-[#f5f5f5] text-text">
      <HeaderNav />

      <main>
        <section className="bg-primary relative pb-14 pt-12 text-white">
          <div className="container">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Car rentals for any kind of trip
            </h1>
            <p className="mt-3 text-xl text-white/95">
              Great cars at great prices from the biggest rental companies
            </p>

            <div className=" absolute xl:-bottom-6 left-0 right-0 container">
              <form
                onSubmit={handleBookNow}
                className="mt-8 rounded-md border-2  wfi  border-accent bg-accent p-[2px] text-text shadow-sm"
              >
                <div className="grid gap-[2px] md:grid-cols-2 gap-x-1 gap-y-1 items-center xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_auto]">
                  <div className="flex min-h-[52px] md:col-span-full xl:col-auto items-center rounded-sm bg-white px-3 py-2">
                    <AutocompleteInput
                      placeholder="Pick-up location"
                      value={form.pickupLocation}
                      onChange={(value) =>
                        handleChange("pickupLocation", value)
                      }
                      onSelect={(value) =>
                        handleChange("pickupLocation", value)
                      }
                      wrapperClassName="z-20"
                      inputClassName="text-sm text-text"
                    />
                  </div>

                  <div className="min-h-[52px] flex items-center rounded-sm bg-white px-3 py-2">
                    <DateRangeDropdown
                      startDate={form.pickupDate}
                      endDate=""
                      singleDateMode
                      onChange={({ startDate }) => {
                        handleChange("pickupDate", startDate);
                        if (form.dropoffDate && form.dropoffDate < startDate) {
                          handleChange("dropoffDate", startDate);
                        }
                      }}
                      placeholder="Pick-up date"
                      wrapperClassName="w-full "
                    />
                  </div>

                  <label className="flex min-h-[52px] items-center gap-2 rounded-sm bg-white px-3 py-2">
                    <FiClock className="shrink-0 text-muted" size={20} />
                    <select
                      value={form.pickupTime}
                      onChange={(e) =>
                        handleChange("pickupTime", e.target.value)
                      }
                      className="w-full border-0 bg-transparent p-0 text-sm outline-none"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="min-h-[52px] flex items-center rounded-sm bg-white px-3 py-2">
                    <DateRangeDropdown
                      startDate={form.dropoffDate}
                      endDate=""
                      singleDateMode
                      onChange={({ startDate }) => {
                        if (form.pickupDate && startDate < form.pickupDate) {
                          handleChange("dropoffDate", form.pickupDate);
                        } else {
                          handleChange("dropoffDate", startDate);
                        }
                      }}
                      placeholder="Drop-off date"
                      wrapperClassName="w-full"
                    />
                  </div>

                  <label className="flex min-h-[52px] items-center gap-2 rounded-sm bg-white px-3 py-2">
                    <FiClock className="shrink-0 text-muted" size={20} />
                    <select
                      value={form.dropoffTime}
                      onChange={(e) =>
                        handleChange("dropoffTime", e.target.value)
                      }
                      className="w-full border-0 bg-transparent p-0 text-sm outline-none"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="submit"
                    className="min-h-[52px] w-full rounded-sm bg-link px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005dc1] md:col-span-2 xl:col-span-1"
                  >
                    Book now
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || "00"}`}>
                  <button className="rounded-sm bg-link px-4 py-2 text-sm font-semibold text-white">
                    Call Us
                  </button>
                </a>
                <a href="/about-us">
                  <button className="rounded-sm border border-border px-4 py-2 text-sm font-semibold text-link">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-[#ebebeb] py-10">
          <div className="container grid gap-8 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Image
                src="/images/CustomerSupport.png"
                alt="Customer support"
                width={56}
                height={56}
              />
              <div>
                <p className="font-bold">We&apos;re here for you</p>
                <p className="text-sm text-muted">
                  Customer support in over 30 languages
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/FreeCancellation.png"
                alt="Free cancellation"
                width={56}
                height={56}
              />
              <div>
                <p className="font-bold">Free cancellation</p>
                <p className="text-sm text-muted">
                  Up to 48 hours before pick-up for most bookings
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/Reviews.png"
                alt="Verified reviews"
                width={56}
                height={56}
              />
              <div>
                <p className="font-bold">5 million+ reviews</p>
                <p className="text-sm text-muted">
                  By real, verified customers
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <h2 className="text-4xl font-bold">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Accordion items={leftFaqs} />
            <Accordion items={rightFaqs} />
          </div>
        </section>

        <section className="border-y border-border bg-white py-6 text-sm text-muted">
          <div className="container flex flex-wrap gap-x-3 gap-y-1">
            {topLinks.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
