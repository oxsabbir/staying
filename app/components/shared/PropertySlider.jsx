"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiHeart } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function PropertySlider({ items, navId = "property-slider" }) {
  const prevClass = `prev-${navId}`;
  const nextClass = `next-${navId}`;

  return (
    <div className="relative">
      <button
        className={`bg-slate-200 hover:scale-110 hidden md:flex duration-200 rounded-full absolute -left-5 top-1/2 p-1 -translate-y-1/2 z-10 ${prevClass}`}
      >
        <BiChevronLeft className="text-gray-500" size={32} />
      </button>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 16 },
        }}
        className="!pb-2"
      >
        {items.map((card) => {
          const attr = card.attributes || card;
          const imageUrl =
            attr.coverImage?.url ||
            attr.image?.[0] ||
            "/images/hotels/placeholder.jpg";
          const slug = attr.slug || card.slug || card.documentId || card.id;
          const name = attr.name;
          const location =
            attr.address ||
            attr.area ||
            attr.city?.name ||
            attr.location ||
            "Saudi Arabia";
          const price = attr.price;
          const rating = attr.Rating || attr.rating || "8.5";
          const ratingLabel = attr.ratingLabel || "Excellent";

          return (
            <SwiperSlide key={card.id || name} style={{ height: "auto" }}>
              <Link href={`/rooms/${slug}`} className="block h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-bg">
                  <div
                    className="relative h-40 flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted">
                      <FiHeart />
                    </button>
                  </div>
                  <div className="flex flex-grow flex-col gap-2 p-4">
                    <h3 className="font-semibold leading-tight text-base">
                      {name}
                    </h3>
                    <p className="text-sm text-muted">{location}</p>
                    <p className="text-sm font-bold text-text">
                      From SAR {price}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs">
                      <span className="rounded-xs bg-primary px-1.5 py-0.5 text-white">
                        {rating}
                      </span>
                      <span>{ratingLabel}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        className={`bg-slate-200 hover:scale-110 duration-200 rounded-full absolute -right-5 p-1 hidden md:flex top-1/2 -translate-y-1/2 z-10 ${nextClass}`}
      >
        <BiChevronRight className="text-gray-600" size={32} />
      </button>
    </div>
  );
}
