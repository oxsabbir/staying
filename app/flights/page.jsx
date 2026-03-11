"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiShield,
  FiClock,
  FiZap,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";
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
    fromId: null,
    toId: null,
    departureDate: "",
    returnDate: "",
    travelers: {
      adults: 1,
      children: 0,
      cabin: "Economy",
    },
  });

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectFrom = (airport) => {
    setForm((prev) => ({
      ...prev,
      from: `${airport.city} (${airport.iata})`,
      fromId: airport.id,
    }));
  };

  const handleSelectTo = (airport) => {
    setForm((prev) => ({
      ...prev,
      to: `${airport.city} (${airport.iata})`,
      toId: airport.id,
    }));
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
    <div className="min-h-screen bg-[#f8f9fa] text-text font-sans">
      <HeaderNav />

      {/* Minimal Hero Section */}
      <section className="bg-primary text-white pt-12 pb-24 sm:pt-16 sm:pb-32 relative overflow-hidden">
        <div className="container-wide relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Book Your Spiritual Journey
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-[500px] mx-auto">
            Hajj and Umrah flight packages tailored for your comfort.
          </p>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </section>

      <main className="container-wide -mt-16 sm:-mt-20 pb-20 relative z-20">
        {/* Minimal Search Bar Container */}
        <div className="bg-white rounded-xl shadow-2 p-1.5 sm:p-2 border border-border">
          <form onSubmit={handleSubmit}>
            {/* Trip Type Tabs */}
            <div className="flex items-center gap-1 p-1 mb-2 bg-subtle rounded-lg w-fit ml-2 mt-2">
              {["Round-trip", "One-way"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setField("tripType", type)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                    form.tripType === type
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid gap-1 lg:grid-cols-[1.2fr_1.2fr_1.2fr_1fr_auto] items-stretch">
              <div className="bg-white border border-transparent hover:border-link/30 p-4 transition-colors group">
                <AutocompleteInput
                  placeholder="Flying from"
                  value={form.from}
                  onChange={(value) => setField("from", value)}
                  onSelect={handleSelectFrom}
                  excludeId={form.toId}
                  emptyText="No locations found."
                  inputClassName="bg-transparent text-sm font-semibold w-full focus:outline-none border-none p-0 placeholder:text-muted/50"
                />
              </div>

              <div className="bg-white border border-transparent hover:border-link/30 border-l-border lg:border-l p-4 transition-colors group">
                <AutocompleteInput
                  placeholder="Flying to"
                  value={form.to}
                  onChange={(value) => setField("to", value)}
                  onSelect={handleSelectTo}
                  excludeId={form.fromId}
                  emptyText="No locations found."
                  inputClassName="bg-transparent text-sm font-semibold w-full focus:outline-none border-none p-0 placeholder:text-muted/50"
                />
              </div>

              <div className="bg-white border border-transparent hover:border-link/30 border-l-border lg:border-l p-4 transition-colors group">
                <DateRangeDropdown
                  startDate={form.departureDate}
                  endDate={form.tripType === "One-way" ? "" : form.returnDate}
                  onChange={({ startDate, endDate }) => {
                    setField("departureDate", startDate);
                    setField(
                      "returnDate",
                      form.tripType === "One-way" ? "" : endDate,
                    );
                  }}
                  placeholder={
                    form.tripType === "One-way" ? "Add date" : "Add dates"
                  }
                  singleDateMode={form.tripType === "One-way"}
                  wrapperClassName="w-full"
                />
              </div>

              <div className="bg-white border border-transparent hover:border-link/30 border-l-border lg:border-l p-4 transition-colors group">
                <TravelerCabinDropdown
                  value={form.travelers}
                  onChange={(value) => setField("travelers", value)}
                  wrapperClassName="w-full"
                />
              </div>

              <div className="p-2 lg:p-1 flex items-center bg-white lg:bg-transparent">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full lg:w-auto px-10 py-4 h-full rounded-lg text-sm font-bold text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                    isFormValid
                      ? "bg-link hover:bg-[#005dc1]"
                      : "cursor-not-allowed bg-blue-600/50"
                  }`}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Why Choose Us Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Specialized for Pilgrimage
            </h2>
            <p className="text-muted max-w-[600px] mx-auto">
              We understand the unique needs of Hajj and Umrah travelers,
              offering services that make your spiritual journey comfortable and
              stress-free.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <FiShield className="w-6 h-6" />,
                title: "Flexible Bookings",
                desc: "Changes and cancellations handled specifically for pilgrimage-related requirements and visa delays.",
                color: "bg-blue-50 text-link",
              },
              {
                icon: <FiClock className="w-6 h-6" />,
                title: "24/7 Dedicated Support",
                desc: "Our team is available round the clock to assist with your flights while you are in Saudi Arabia.",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: <FiZap className="w-6 h-6" />,
                title: "Direct Haram Access",
                desc: "We prioritize flight options that align with hotel check-ins near the Haram in Mecca and Medina.",
                color: "bg-accent/10 text-accent",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <section className="mt-24 bg-white rounded-2xl border border-border p-8 sm:p-12 shadow-sm overflow-hidden relative">
          <div className="max-w-[700px] space-y-6 relative z-10">
            <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
            <p className="text-muted leading-relaxed">
              Our experts are ready to find the most cost-effective and
              comfortable flight options for you. Booking via WhatsApp ensures
              personalized service and immediate assistance.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FiCheckCircle className="text-green-600" /> No hidden fees
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FiCheckCircle className="text-green-600" /> Best price
                guarantee
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FiCheckCircle className="text-green-600" /> Pilgrim support
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 opacity-10 hidden xl:block">
            <FiZap className="w-64 h-64" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
