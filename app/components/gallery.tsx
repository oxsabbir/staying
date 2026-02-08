"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useEffect, useState } from "react";

//    <GalleryPreview
//         place={place}
//         onOpen={(index) => {
//           setGalleryIndex(index);
//           setGalleryOpen(true);
//         }}
//       />
//       <GalleryModal
//         place={place}
//         isOpen={galleryOpen}
//         startIndex={galleryIndex}
//         onClose={() => setGalleryOpen(false)}
//       />

export function GalleryPreview({ place, onOpen }) {
  return (
    <section className="mt-6 rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Gallery</div>
          <div className="text-xs text-muted">
            {place.gallery.length} photos
          </div>
        </div>
        <button
          className="rounded-md border border-border px-3 py-2 text-xs font-semibold text-link"
          onClick={() => onOpen(0)}
          type="button"
        >
          View gallery
        </button>
      </div>

      <button
        className="mt-4 block w-full overflow-hidden rounded-md border border-border"
        onClick={() => onOpen(0)}
        type="button"
      >
        <img
          src={place.gallery[0]}
          alt={`${place.name} gallery hero`}
          className="h-56 w-full object-cover sm:h-64"
        />
      </button>

      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-8">
        {place.gallery.slice(1, 9).map((image, index) => (
          <button
            key={image}
            className="overflow-hidden rounded-md border border-border"
            onClick={() => onOpen(index + 1)}
            type="button"
          >
            <img
              src={image}
              alt=""
              className="h-14 w-full object-cover sm:h-16"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export function GalleryModal({ place, isOpen, startIndex, onClose }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 p-3 sm:p-6">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Gallery</span>
          </div>
          <div className="text-sm font-semibold">{place.name}</div>
          <div className="flex items-center gap-3">
            <button className="rounded-md bg-link px-3 py-2 text-xs font-semibold text-white">
              Reserve now
            </button>
            <button
              className="text-xs font-semibold text-muted"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 lg:flex-row">
          <div className="flex flex-1 flex-col items-center justify-center">
            <Swiper
              modules={[Navigation, Thumbs, Keyboard]}
              navigation
              keyboard={{ enabled: true }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              initialSlide={startIndex}
              className="w-full"
            >
              {place.gallery.map((image) => (
                <SwiperSlide key={image}>
                  <img
                    src={image}
                    alt={place.name}
                    className="mx-auto h-[360px] w-full rounded-lg object-cover sm:h-[440px] lg:h-[520px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-4 w-full">
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView={6}
                spaceBetween={8}
                watchSlidesProgress
                breakpoints={{
                  320: { slidesPerView: 4 },
                  640: { slidesPerView: 6 },
                  1024: { slidesPerView: 8 },
                }}
              >
                {place.gallery.map((image, index) => (
                  <SwiperSlide key={`${image}-${index}`}>
                    <img
                      src={image}
                      alt=""
                      className="h-16 w-full rounded-md object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
