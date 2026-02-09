"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiHeart } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function PropertySlider({ items }) {
  return (
    <div className="relative">
      <button
        className={`bg-slate-200 hover:scale-110 hidden md:flex duration-200 rounded-full absolute -left-5 top-1/2 p-1 -translate-y-1/2 z-10 prev-unique-property`}
      >
        <BiChevronLeft className="text-gray-500" size={32} />
      </button>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.prev-unique-property`,
          nextEl: `.next-unique-property`,
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
        {items.map((card) => (
          <SwiperSlide key={card.slug} style={{ height: "auto" }}>
            <Link href={`/rooms/${card.slug}`} className="block h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-bg">
                <div
                  className="relative h-40 flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.images[0].src})` }}
                >
                  <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted">
                    <FiHeart />
                  </button>
                </div>
                <div className="flex flex-grow flex-col gap-2 p-4">
                  <h3 className="font-semibold leading-tight text-base">
                    {card.name}
                  </h3>
                  <p className="text-sm text-muted">{card.location}</p>
                  <p className="text-sm font-bold text-text">
                    From {card.availability.rooms[0].price}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-xs">
                    <span className="rounded-xs bg-primary px-1.5 py-0.5 text-white">
                      {card.rating}
                    </span>
                    <span>{card.ratingLabel}</span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`bg-slate-200 hover:scale-110 duration-200 rounded-full absolute -right-5 p-1 hidden md:flex top-1/2 -translate-y-1/2 z-10 next-unique-property`}
      >
        <BiChevronRight className="text-gray-600" size={32} />
      </button>
    </div>
  );
}
