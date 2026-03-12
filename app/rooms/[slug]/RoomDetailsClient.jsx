"use client";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSearch,
  FiCheckCircle,
  FiShare2,
  FiHeart,
  FiStar,
  FiChevronRight,
  FiCopy,
  FiX,
  FiMail,
  FiCheck,
  FiInfo,
  FiAlertCircle,
  FiMinus,
} from "react-icons/fi";
import { roomSections } from "../../../data/roomDetails";
import { GalleryPreview, GalleryModal } from "../../../app/components/gallery";
import { useState } from "react";
import SiteFooter from "../../components/home/SiteFooter";
import Wishlist from "../../components/shared/Wishlist";
import { HeroSearch } from "../../components/home";
import { useSearchContext } from "../../context/SearchContext";
import HeaderNav from "../../components/home/HeaderNav";
import MarkdownRenderer from "../../components/shared/MarkdownRenderer";
import Accordion from "../../components/shared/Accordion";

function ShareModal({ isOpen, onClose, url, propertyName }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.433 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      color: "bg-[#25D366]",
      action: () => {
        const text = `Check out this property: ${propertyName}\n${url}`;
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text)}`,
          "_blank",
        );
      },
    },
    {
      name: "Email",
      icon: <FiMail className="w-5 h-5" />,
      color: "bg-link",
      action: () => {
        const subject = `Check out this property: ${propertyName}`;
        const body = `I found this property on Staying.com and thought you might like it:\n\n${propertyName}\n${url}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-sm w-full max-w-md overflow-hidden shadow-2 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-bold text-lg">Share this property</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-subtle rounded-full transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted mb-4">
            Copy the link below or share directly to your favorite apps.
          </p>

          <div className="flex gap-2 mb-6">
            <div className="flex-1 bg-subtle border border-border rounded-xs px-3 py-2 text-sm text-text truncate">
              {url}
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-xs font-semibold transition-all ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-link text-white hover:opacity-90"
              }`}
            >
              {copied ? (
                <>
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className="flex items-center justify-center gap-3 p-3 rounded-xs border border-border hover:bg-subtle transition-colors group"
              >
                <div
                  className={`p-2 rounded-full ${option.color} text-white group-hover:scale-110 transition-transform`}
                >
                  {option.icon}
                </div>
                <span className="font-medium text-sm">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}

export default function RoomDetailsClient({ initialProperty }) {
  const room = initialProperty;

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { updateData, data } = useSearchContext();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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
      `Check-in: ${data?.checkIn || "Not set"}`,
      `Check-out: ${data?.checkOut || "Not set"}`,
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
        <section className="container py-4">
          <nav className="flex items-center gap-2 mb-4 text-xs text-muted overflow-x-auto whitespace-nowrap scrollbar-hide">
            <a href="/" className="hover:text-link">
              Home
            </a>
            <FiChevronRight className="shrink-0" />
            <a href="/places/saudi-arabia" className="hover:text-link">
              Saudi Arabia
            </a>
            <FiChevronRight className="shrink-0" />
            <span className="hover:text-link capitalize cursor-pointer">
              {room.location?.split(",")[1]?.trim() || "City"}
            </span>
            <FiChevronRight className="shrink-0" />
            <span className="font-medium text-text truncate">{room.name}</span>
          </nav>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="bg-subtle px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider border border-border">
                  {room.facts?.find((f) => f.label === "Property Type")
                    ?.value || "Hotel"}
                </span>
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-current w-3.5 h-3.5" />
                  ))}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                {room.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted hover:text-link cursor-pointer">
                  <FiMapPin className="text-link shrink-0" />
                  <span className="underline decoration-dotted underline-offset-4">
                    {room.location}
                  </span>
                </div>

                {room.highlight && (
                  <span className="text-link text-sm font-medium">
                    {room.highlight}
                  </span>
                )}
              </div>
            </div>

            <div className="flex  justify-between items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <Wishlist />
                <button
                  onClick={() => setShareOpen(true)}
                  title="Share this property"
                  className="p-2.5 rounded-full border border-border hover:bg-subtle transition-colors flex items-center justify-center"
                >
                  <FiShare2 className="w-5 h-5" />
                </button>
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
                className="rounded-xs bg-primary text-white px-6 py-2.5 font-semibold hover:opacity-90 transition-opacity"
              >
                Reserve
              </button>
            </div>
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
                <h3 className="font-semibold">
                  {room.ratingLabel || "Rating"}
                </h3>
                <p className="text-xs text-muted">{room.reviewCount} reviews</p>
              </div>
              <span className="rounded-xs bg-primary px-2 py-1 font-bold text-white">
                {room.rating}
              </span>
            </div>
            <div className="grid gap-3 rounded-sm border border-border bg-bg p-4">
              <h4 className="font-semibold text-sm">Property highlights</h4>
              <p className="text-sm text-muted">{room.overview}</p>
              <div className="grid gap-2 text-sm">
                {room.facts?.map((fact) => (
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
                  {room.mapLink && (
                    <iframe
                      src={room.mapLink.includes("google.com/maps/embed") ? room.mapLink : `https://maps.google.com/maps?q=${encodeURIComponent(room.mapLink)}&output=embed`}
                      width="100%"
                      height="180"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  )}
                </div>
              </button>
            </div>
          </aside>
        </section>

        <section className="container py-8 md:py-12 border-t border-border mt-6">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr]">
            {/* Left Column: Description & Facts */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
                  <FiInfo className="text-link" />
                  About this property
                </h2>
                
                <div className="prose-container">
                  <MarkdownRenderer
                    content={room.propertyDetails || room.overview}
                    className="text-[15px] leading-[1.7]"
                  />
                </div>

                {room.highlight && (
                  <div className="mt-6 p-4 bg-subtle/50 rounded-sm border-l-4 border-link">
                    <p className="text-sm font-medium text-text">
                      <span className="text-link">Key Highlight:</span> {room.highlight}
                    </p>
                  </div>
                )}
              </div>

              {/* Property Facts Grid */}
              {room.facts && room.facts.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {room.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="p-4 rounded-sm border border-border bg-white flex flex-col gap-1 hover:shadow-1 transition-shadow duration-200"
                    >
                      <span className="text-[10px] uppercase tracking-wider text-muted font-bold">
                        {fact.label}
                      </span>
                      <span className="text-sm font-semibold text-text">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Amenities Section */}
              <div className="pt-4">
                <h3 className="text-lg font-bold mb-5">Most popular facilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                  {room.amenities?.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <FiCheck className="text-green-600 shrink-0 w-5 h-5" />
                      <span className="font-medium text-text/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar info */}
            <div className="space-y-6">
              <div className="rounded-sm border border-border bg-white overflow-hidden">
                <div className="bg-subtle p-4 border-b border-border">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-text flex items-center gap-2">
                    <FiCheckCircle className="text-link" />
                    Good to know
                  </h3>
                </div>
                <div className="p-5">
                  <ul className="grid gap-4 text-sm text-muted">
                    {room.finePrint?.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-link mt-1.5 shrink-0" />
                        <span className="leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-5 border-t border-border">
                    <button 
                      onClick={() => document.getElementById('reservation-section').scrollIntoView({ behavior: 'smooth' })}
                      className="w-full py-2.5 text-link font-bold text-sm border border-link rounded-xs hover:bg-link hover:text-white transition-all"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>

              {/* Helpful Badge */}
              <div className="p-4 rounded-sm border border-border bg-link/5 flex gap-3 items-start">
                <div className="p-2 rounded-full bg-link text-white shrink-0">
                  <FiStar className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-link mb-1">Top Choice</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    This property is highly recommended for its excellent location and service.
                  </p>
                </div>
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
            <HeroSearch
              isReserving={true}
              fixedCity={room.location}
              hideLocationField={true}
              defaultOneNight={true}
            />
            <div className="grid gap-6 mt-8">
              {room.availability?.rooms?.map((item, idx) => (
                <div 
                  key={item.type + idx} 
                  className="group bg-white border border-border rounded-sm overflow-hidden hover:shadow-2 transition-all duration-300 flex flex-col md:grid md:grid-cols-[1.2fr_1fr_220px]"
                >
                  {/* Column 1: Room Details */}
                  <div className="p-6 border-b md:border-b-0 md:border-r border-border">
                    <h3 className="font-bold text-xl text-link hover:underline cursor-pointer mb-3">
                      {item.type}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-text">
                        <span className="flex items-center gap-1.5 font-semibold bg-subtle px-2 py-1 rounded-xs">
                          <FiUsers className="w-4 h-4" /> 
                          {selectedAdults + selectedChildren} adults
                        </span>
                        <span className="text-muted">•</span>
                        <span className="text-muted">{item.beds}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.perks?.map((perk) => (
                          <span 
                            key={perk} 
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#008009]"
                          >
                            <FiCheck className="w-3.5 h-3.5" /> 
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Selection & Benefits */}
                  <div className="p-6 border-b md:border-b-0 md:border-r border-border bg-subtle/5">
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Your selection includes:</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center gap-3 text-sm text-text font-medium">
                        <FiCheckCircle className="text-[#008009] w-4 h-4 shrink-0" />
                        <span>Breakfast included</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-text font-medium">
                        <FiCheckCircle className="text-[#008009] w-4 h-4 shrink-0" />
                        <span>Instant confirmation</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#008009] font-bold">
                        <FiCheckCircle className="w-4 h-4 shrink-0" />
                        <span>No prepayment needed</span>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Pricing & Action */}
                  <div className="p-6 flex flex-col justify-center items-center md:items-end text-center md:text-right bg-white">
                    <div className="mb-4">
                      <div className="text-[10px] text-muted font-bold uppercase mb-1">Price for {selectedNights} night{selectedNights > 1 ? "s" : ""}</div>
                      <div className="text-2xl font-black text-primary leading-none">
                        SAR {calculateTotalPrice(item.priceMultiplier || 1).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-text mt-1 font-semibold">
                        SAR {Math.round((room.basePrice || 0) * (item.priceMultiplier || 1)).toLocaleString()} / night
                      </div>
                      <div className="text-[10px] text-muted mt-0.5 font-medium">
                        +SAR 0 taxes and charges
                      </div>
                    </div>

                    <button
                      onClick={() => handleRoomReserve(item)}
                      className="w-full rounded-xs px-6 py-3 bg-link text-white text-sm font-bold hover:bg-link/90 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      I'll reserve
                    </button>
                    <p className="text-[11px] text-muted mt-3">Confirmation is immediate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container grid gap-6 py-10 md:grid-cols-3">
          {roomSections.map((section) => (
            <div
              key={section.title}
              className="rounded-sm border border-border bg-white p-6 shadow-1 hover:shadow-2 transition-shadow duration-300"
            >
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-subtle pb-2">{section.title}</h3>
              <ul className="grid gap-3 text-sm text-muted">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="bg-subtle/30 py-12 mt-10">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border">
                  <FiCheckCircle className="text-green-600 w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Verified Listings</h4>
                <p className="text-sm text-muted">All properties on Staying.com are hand-picked and verified for quality and service.</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border">
                  <FiUsers className="text-link w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Real Guest Reviews</h4>
                <p className="text-sm text-muted">We only feature reviews from guests who have completed their stay at the property.</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border">
                  <FiSearch className="text-accent w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Best Price Guarantee</h4>
                <p className="text-sm text-muted">Found a lower price elsewhere? Contact our team via WhatsApp and we will match it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 border-t border-border mt-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-primary">Frequently Asked Questions</h2>
            <Accordion
              items={[
                {
                  title: "How do I confirm my reservation?",
                  body: "After you click 'Reserve', a WhatsApp message will be prepared with your booking details. Simply send the message to our team, and we will confirm availability and provide payment instructions to finalize your stay.",
                },
                {
                  title: "Are the prices shown inclusive of taxes?",
                  body: "Yes, the prices displayed on Staying.com generally include all applicable VAT and municipality fees in Saudi Arabia, so there are no hidden surprises at checkout.",
                },
                {
                  title: "Can I request an early check-in or late check-out?",
                  body: "Early check-in and late check-out are subject to availability and the hotel's policy. We recommend mentioning your request in the WhatsApp message during the reservation process so we can check with the property for you.",
                },
                {
                  title: "What is the cancellation policy?",
                  body: "Cancellation policies vary by room type and property. Many of our listings offer 'Free Cancellation' up to a certain date. Please check the specific terms listed under your chosen room's perks before confirming.",
                },
                {
                  title: "Do you offer airport transfer services?",
                  body: "We have a dedicated 'Airport Taxis' section on our website. You can also ask our support team via WhatsApp if the specific hotel you are booking provides its own shuttle service.",
                },
              ]}
            />
          </div>
        </section>

      </main>
      <SiteFooter />
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
        propertyName={room.name}
      />
    </div>
  );
}
