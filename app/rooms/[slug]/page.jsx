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

export default function RoomDetailsPage() {
  const paramsResult = useParams();
  const room = roomDetailsData[paramsResult.slug];

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="bg-primary text-white pt-4 pb-3">
        <div className="container flex items-center justify-between gap-5 pb-3">
          <div className="text-xl font-bold">Booking.com</div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-xs border border-transparent px-3 py-2 text-white">
              BDT
            </button>
            <button className="rounded-xs border border-transparent px-3 py-2 text-white">
              English
            </button>
            <button className="rounded-xs border border-transparent px-3 py-2 text-white">
              List your property
            </button>
            <button className="rounded-xs border border-white px-3 py-2 text-white">
              Register
            </button>
            <button className="rounded-xs bg-white px-3 py-2 font-semibold text-primary">
              Sign in
            </button>
          </div>
        </div>
        <div className="container pb-4">
          <div className="grid grid-cols-[repeat(3,minmax(180px,1fr))_140px] overflow-hidden rounded-sm border-2 border-accent bg-white max-[960px]:grid-cols-1">
            <div className="flex items-center gap-2 border-r border-border p-3 text-muted max-[960px]:border-b max-[960px]:border-r-0">
              <FiMapPin />
              <input
                className="w-full text-text placeholder:text-muted"
                placeholder="Kathmandu"
              />
            </div>
            <div className="flex items-center gap-2 border-r border-border p-3 text-muted max-[960px]:border-b max-[960px]:border-r-0">
              <FiCalendar />
              <input
                className="w-full text-text placeholder:text-muted"
                placeholder="Check-in date — Check-out date"
              />
            </div>
            <div className="flex items-center gap-2 border-r border-border p-3 text-muted max-[960px]:border-b max-[960px]:border-r-0">
              <FiUsers />
              <input
                className="w-full text-text placeholder:text-muted"
                placeholder="2 adults · 0 children · 1 room"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-link font-semibold text-white max-[960px]:p-3">
              <FiSearch />
              Search
            </button>
          </div>
        </div>
      </header>

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

            <button className="rounded-xs text-white bg-primary px-3 py-2 font-semibold text-primary">
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
              <button className="rounded-xs bg-primary px-3 hover:opacity-90 duration-200 py-2 font-semibold text-white">
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
          <div>
            <h2 className="text-[1.3rem] font-semibold">Property overview</h2>
            <p className="mt-3 text-muted">{room.overview}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {room.amenities.map((item) => (
                <div key={item} className="flex items-center gap-2 text-muted">
                  <FiCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-subtle py-7">
          <div className="container">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-[1.3rem] font-semibold">Availability</h2>
              <span className="text-muted">
                Prices for {room.availability.checkIn}
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
            <HeroSearch isReserving={true} />
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
                    <strong>{item.price}</strong>
                    <button className="rounded-xs bg-white px-3 py-2 text-sm font-semibold text-primary">
                      Reserve
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
          <button className="text-link">See all policies</button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
