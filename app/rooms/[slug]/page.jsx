"use client";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSearch,
  FiCheckCircle,
  FiShare2,
  FiHeart,
} from "react-icons/fi";
import { roomDetailsData, roomSections } from "../../../data/roomDetails";
import { GalleryPreview, GalleryModal } from "../../../app/components/gallery";
import { useParams } from "next/navigation";
import { useState } from "react";
import SiteFooter from "../../components/home/SiteFooter";
import Wishlist from "../../components/shared/Wishlist";
import { HeroSearch } from "../../components/home";
import { useSearchContext } from "../../context/SearchContext";
import HeaderNav from "../../components/home/HeaderNav";

export default function RoomDetailsPage() {
  const paramsResult = useParams();
  const room = roomDetailsData[paramsResult.slug];

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { updateData, data } = useSearchContext();
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966576033238";

  const selectedRooms = Math.max(1, data?.guests?.rooms || 1);
  const selectedAdults = data?.guests?.adults || 2;
  const selectedChildren = data?.guests?.children || 0;

  const getNights = () => {
    if (!data?.checkIn || !data?.checkOut) return 1;
    const start = new Date(data.checkIn);
    const end = new Date(data.checkOut);
    const diffMs = end - start;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(1, Number.isFinite(diffDays) ? diffDays : 1);
  };

  const selectedNights = getNights();

  const calculateTotalPrice = (multiplier = 1) => {
    const basePrice = room.basePrice || 0;
    return Math.round(basePrice * multiplier * selectedNights * selectedRooms);
  };

  const handleRoomReserve = (item) => {
    const total = calculateTotalPrice(item.priceMultiplier || 1);
    const message = [
      "Assalamu Alaikum, I would like to reserve this room.",
      "",
      `Property: ${room.name}`,
      `Room type: ${item.type}`,
      `Check-in: ${data?.checkIn || room.availability.checkIn}`,
      `Check-out: ${data?.checkOut || room.availability.checkOut}`,
      `Nights: ${selectedNights}`,
      `Adults: ${selectedAdults}`,
      `Children: ${selectedChildren}`,
      `Rooms: ${selectedRooms}`,
      `Total price: SAR ${total.toLocaleString()}`,
      `Room URL: ${window.location.href}`,
      "",
      "Please confirm availability and booking steps.",
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <HeaderNav />

      <main className="bg-bg pb-10">
        <section className="container flex flex-col justify-between gap-4 py-6 md:flex-row md:items-start">
          <div>
            <h1 className="text-[1.8rem] font-semibold">{room.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-muted">
              <FiMapPin />
              <span>{room.location}</span>
              <span className="text-link text-sm">
                Excellent location — {room.highlight}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wishlist />

            <button
              onClick={() => {
                updateData({
                  roomName: room.name,
                  roomUrl: window.location.href,
                });
                document
                  .getElementById("reservation-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xs text-white bg-primary px-3 py-2 font-semibold text-primary"
            >
              Reserve
            </button>
          </div>
        </section>

        <section className="container grid  gap-5 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          <GalleryPreview
            place={room}
            onOpen={(index) => {
              setGalleryIndex(index);
              setGalleryOpen(true);
            }}
          />
          <GalleryModal
            place={room}
            isOpen={galleryOpen}
            startIndex={galleryIndex}
            onClose={() => setGalleryOpen(false)}
          />

          <aside className="grid gap-4">
            <div className="flex items-center justify-between rounded-sm border border-border bg-bg p-4">
              <div>
                <h3 className="font-semibold">{room.ratingLabel}</h3>
                <p className="text-xs text-muted">{room.reviewCount} reviews</p>
              </div>
              <span className="rounded-xs bg-primary px-2 py-1 font-bold text-white">
                {room.rating}
              </span>
            </div>
            <div className="grid gap-3 rounded-sm border border-border bg-bg p-4">
              <h4 className="font-semibold">Property highlights</h4>
              <p className="text-sm text-muted">{room.overview}</p>
              <div className="grid gap-2 text-sm">
                {room.facts.map((fact) => (
                  <div key={fact.label}>
                    <span className="block text-xs text-muted">
                      {fact.label}
                    </span>
                    <strong className="font-semibold">{fact.value}</strong>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  updateData({
                    roomName: room.name,
                    roomUrl: window.location.href,
                  });
                  document
                    .getElementById("reservation-section")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xs bg-primary px-3 hover:opacity-90 duration-200 py-2 font-semibold text-white"
              >
                I Will Reserve
              </button>
            </div>
            <div className="grid gap-3 rounded-sm border border-border bg-bg p-4">
              <button className="text-link">
                <div className="h-[180px] rounded-xs ">
                  <iframe
                    src={room.mapLink}
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </button>
            </div>
          </aside>
        </section>

        <section className="container py-6">
          <div className="rounded-sm border border-border bg-bg p-5 md:p-6">
            <h2 className="text-[1.3rem] font-semibold">Property overview</h2>

            <div className="mt-4 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-muted">{room.overview}</p>
                <p className="mt-3 text-sm text-muted">{room.highlight}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {room.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-sm border border-border bg-white p-3"
                    >
                      <p className="text-xs uppercase tracking-wide text-muted">
                        {fact.label}
                      </p>
                      <p className="mt-1 font-semibold text-text">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-sm border border-border bg-white p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Good to know
                </h3>
                <ul className="mt-3 grid gap-2 text-sm text-muted">
                  {room.finePrint.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <FiCheckCircle className="mt-0.5 shrink-0 text-link" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-semibold">
                Most popular facilities
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {room.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-sm border border-border bg-white px-3 py-2 text-sm text-muted"
                  >
                    <FiCheckCircle className="text-link" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reservation-section" className="bg-subtle py-7">
          <div className="container">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-[1.3rem] font-semibold">Availability</h2>
              <span className="text-muted">
                Prices for {selectedNights} night{selectedNights > 1 ? "s" : ""}{" "}
                · {selectedRooms} room{selectedRooms > 1 ? "s" : ""}
              </span>
            </div>
            {/* <div className="mb-4 grid grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-3 rounded-sm border-2 border-accent bg-white p-3 max-[960px]:grid-cols-1">
              <div className="grid gap-1 text-muted">
                <strong className="text-text">
                  {room.availability.checkIn}
                </strong>
                <span>Check-in</span>
              </div>
              <div className="grid gap-1 text-muted">
                <strong className="text-text">
                  {room.availability.checkOut}
                </strong>
                <span>Check-out</span>
              </div>
              <div className="grid gap-1 text-muted">
                <strong className="text-text">
                  {room.availability.guests}
                </strong>
                <span>Guests</span>
              </div>
              <button className="rounded-xs bg-white px-3 py-2 font-semibold text-primary">
                Search
              </button>
            </div> */}
            <HeroSearch
              isReserving={true}
              fixedCity={room.location}
              hideLocationField={true}
              defaultOneNight={true}
            />
            <div className="grid gap-3">
              {room.availability.rooms.map((item) => (
                <div
                  key={item.type}
                  className="flex flex-col justify-between gap-4 rounded-sm border border-border bg-bg p-4 md:flex-row md:items-center"
                >
                  <div>
                    <h3 className="font-semibold">{item.type}</h3>
                    <p className="my-1 text-sm text-muted">{item.beds}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-[#0a7a3b]">
                      {item.perks.map((perk) => (
                        <span key={perk}>{perk}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 text-right md:justify-items-end">
                    <strong>
                      SAR{" "}
                      {calculateTotalPrice(
                        item.priceMultiplier || 1,
                      ).toLocaleString()}
                    </strong>
                    <span className="text-xs text-muted">
                      total for {selectedNights} night
                      {selectedNights > 1 ? "s" : ""} · {selectedRooms} room
                      {selectedRooms > 1 ? "s" : ""}
                    </span>
                    <button
                      onClick={() => handleRoomReserve(item)}
                      className="rounded-xs  px-3 py-2 bg-green-600 text-white text-sm font-semibold text-primary"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container grid gap-4 py-6 md:grid-cols-3">
          {roomSections.map((section) => (
            <div
              key={section.title}
              className="rounded-sm border border-border bg-bg p-4"
            >
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="mt-2 grid gap-2 text-sm text-muted">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="container flex flex-col justify-between gap-4 pt-5 md:flex-row md:items-start">
          <div>
            <h2 className="text-[1.3rem] font-semibold">The fine print</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              {room.finePrint.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
