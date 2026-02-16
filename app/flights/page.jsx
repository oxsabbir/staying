"use client";

import { useState } from "react";
import Image from "next/image";
import { FiRepeat } from "react-icons/fi";
import { HeaderNav, SiteFooter } from "../components/home";
import AutocompleteInput from "../components/shared/AutocompleteInput";
import {
  DateRangeDropdown,
  TravelerCabinDropdown,
} from "../components/shared/BookingDropdowns";

export default function FlightsPage() {
  const [form, setForm] = useState({
    tripType: "Round-trip",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travelers: {
      adults: 1,
      children: 0,
      cabin: "Economy",
    },
  });

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801000000000";

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isFormValid =
    form.from.trim().length > 0 &&
    form.to.trim().length > 0 &&
    form.departureDate.trim().length > 0 &&
    form.travelers.adults > 0 &&
    form.travelers.cabin.trim().length > 0 &&
    (form.tripType === "One-way" || form.returnDate.trim().length > 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    const message = [
      "Assalamu Alaikum, I want to book a Hajj-focused flight package.",
      "",
      `Trip type: ${form.tripType}`,
      `From: ${form.from || "Not provided"}`,
      `To (Saudi): ${form.to || "Not provided"}`,
      `Departure date: ${form.departureDate || "Not provided"}`,
      `Return date: ${form.returnDate || "Not provided"}`,
      `Adults: ${form.travelers.adults}`,
      `Children: ${form.travelers.children}`,
      `Cabin class: ${form.travelers.cabin}`,
      "",
      "Please share the best available options, total price, and required documents.",
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#f0f1f3] text-text">
      <HeaderNav />

      <main className="container py-5 sm:py-8">
        <section className="rounded-xl bg-[#dfe2e7]">
          <div className="">
            <div className="p-5 sm:p-8 lg:p-4 lg:py-8">
              <div className=" flex items-center justify-between">
                <h1 className="max-w-[760px] text-3xl font-bold  sm:text-5xl ">
                  Find Hajj-friendly flight options in one place.
                </h1>
                <div className="hidden lg:block">
                  <img
                    src="/images/hajj.png"
                    alt="flight"
                    className="h-[200px]"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8">
                <label className="text-sm font-medium text-text/80">
                  Trip type
                </label>
                <select
                  value={form.tripType}
                  onChange={(e) => setField("tripType", e.target.value)}
                  className="mt-1 block rounded-md border border-border bg-white px-3 py-2 text-sm"
                >
                  <option>Round-trip</option>
                  <option>One-way</option>
                </select>

                <div className="mt-4  rounded-lg border flex border-border bg-white p-2 shadow-sm">
                  <div className="grid gap-2 gap-y-5 xl:gap-y-2  items-center  w-full  xl:grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr]">
                    <div className="rounded-md border border-border px-3 py-2 xl:border-0 xl:border-r xl:rounded-none">
                      <AutocompleteInput
                        placeholder="Flying from"
                        value={form.from}
                        onChange={(value) => setField("from", value)}
                        onSelect={(value) => setField("from", value)}
                        filterCountryCode={null}
                        emptyText="No locations found."
                        inputClassName="text-sm"
                      />
                    </div>

                    <div className="rounded-md border border-border px-3 py-2 xl:border-0 xl:border-r xl:rounded-none">
                      <AutocompleteInput
                        placeholder="Flying to (Saudi Arabia)"
                        value={form.to}
                        onChange={(value) => setField("to", value)}
                        onSelect={(value) => setField("to", value)}
                        filterCountryCode="sa"
                        emptyText="No Saudi locations found."
                        inputClassName="text-sm"
                      />
                    </div>

                    <div className="rounded-md border border-border px-3 py-2 xl:border-0 xl:border-r xl:rounded-none">
                      <DateRangeDropdown
                        startDate={form.departureDate}
                        endDate={
                          form.tripType === "One-way" ? "" : form.returnDate
                        }
                        onChange={({ startDate, endDate }) => {
                          setField("departureDate", startDate);
                          setField(
                            "returnDate",
                            form.tripType === "One-way" ? "" : endDate,
                          );
                        }}
                        placeholder={
                          form.tripType === "One-way"
                            ? "Departure date"
                            : "Departure - Return"
                        }
                        singleDateMode={form.tripType === "One-way"}
                        wrapperClassName={form.tripType === "One-way" ? "" : ""}
                      />
                    </div>

                    <div className="rounded-md border border-border px-3 py-2 xl:border-0 xl:rounded-none">
                      <TravelerCabinDropdown
                        value={form.travelers}
                        onChange={(value) => setField("travelers", value)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`rounded-md px-5 py-3 text-sm font-semibold text-white xl:min-w-[170px] ${
                        isFormValid
                          ? "bg-link hover:bg-[#005dc1]"
                          : "cursor-not-allowed bg-blue-600/80"
                      }`}
                    >
                      Book on WhatsApp
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
