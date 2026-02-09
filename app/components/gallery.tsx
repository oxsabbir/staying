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
  console.log(place);
  return (
    <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Gallery</div>
          <div className="text-xs text-muted">{place.images.length} photos</div>
        </div>
        <button
          className="rounded-md border border-border px-3 py-2 text-xs font-semibold text-link"
          onClick={() => onOpen(0)}
          type="button"
        >
          View gallery
        </button>
      </div>
      <div>
        <div
          className=" h-[300px] md:h-[600px] lg:h-[550px] w-full rounded-xl mt-4"
          onClick={() => onOpen(0)}
        >
          <img
            src={place.images[0]}
            alt={`${place.name} gallery hero`}
            className="h-full rounded-lg p-2 w-full object-cover"
          />
        </div>

        <div className="mt-3  grid grid-cols-5 gap-2 sm:grid-cols-8">
          {place.images.slice(1, 9).map((image, index) => (
            <button
              key={image}
              className="overflow-hidden rounded-md border border-border"
              onClick={() => onOpen(index + 1)}
              type="button"
            >
              <img
                src={image}
                alt={`${place.name} gallery image ${index + 1}`}
                className="h-14 w-full object-cover sm:h-16"
              />
            </button>
          ))}
        </div>
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
          <div className="text-sm font-semibold truncate hidden md:flex">
            {place.name}
          </div>
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
              // navigation
              keyboard={{ enabled: true }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              initialSlide={startIndex}
              className="h-full w-full  rounded-xl lg:w-[1000px] xl:w-[1200px]"
            >
              {place.images.map((image, index) => (
                <SwiperSlide key={image} className="rounded-xl">
                  <div className="rounded-xl w-full h-full">
                    <img
                      src={image}
                      alt={`${place.name} gallery image ${index + 1}`}
                      className="mx-auto h-full md:max-h-[540px] lg:max-h-[700px] lg:h-full object-contain rounded-xl"
                    />
                  </div>
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
                  1280: { slidesPerView: 10 },
                }}
              >
                {place.images.map((image, index) => (
                  <SwiperSlide key={`${image}-${index}`} className="!w-fit">
                    <img
                      src={image}
                      alt={`${place.name} gallery image ${index + 1}`}
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
