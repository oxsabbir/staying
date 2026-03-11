"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Keyboard, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { useEffect, useState, useRef } from "react";
import { FiX, FiZoomIn, FiZoomOut, FiMaximize, FiMinimize, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function GalleryPreview({ place, onOpen }) {
  if (!place?.images?.length) return null;

  return (
    <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Gallery</div>
          <div className="text-xs text-muted">{place.images.length} photos</div>
        </div>
        <button
          className="rounded-md border border-border px-3 py-2 text-xs font-semibold text-link hover:bg-subtle transition-colors"
          onClick={() => onOpen(0)}
          type="button"
        >
          View gallery
        </button>
      </div>
      <div>
        <div
          className="h-[300px] md:h-[500px] lg:h-[550px] w-full rounded-xl mt-4 cursor-pointer overflow-hidden group"
          onClick={() => onOpen(0)}
        >
          <img
            src={place.images[0]}
            alt={`${place.name} gallery hero`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-8">
          {place.images.slice(1, 9).map((image, index) => (
            <button
              key={image}
              className="overflow-hidden rounded-md border border-border aspect-square hover:opacity-80 transition-opacity"
              onClick={() => onOpen(index + 1)}
              type="button"
            >
              <img
                src={image}
                alt={`${place.name} gallery image ${index + 1}`}
                className="h-full w-full object-cover"
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
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(startIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, startIndex]);

  const handleZoomIn = () => {
    if (swiperRef.current?.zoom) {
      swiperRef.current.zoom.in();
    }
  };

  const handleZoomOut = () => {
    if (swiperRef.current?.zoom) {
      swiperRef.current.zoom.out();
    }
  };

  if (!isOpen || !place?.images?.length) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 text-white border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold sm:text-base truncate">{place.name}</span>
          <span className="text-[10px] sm:text-xs text-white/60">
            {activeIndex + 1} / {place.images.length} photos
          </span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-3 ml-4">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:flex"
            title="Zoom out"
          >
            <FiZoomOut size={20} />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:flex"
            title="Zoom in"
          >
            <FiZoomIn size={20} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close gallery"
          >
            <FiX size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <Swiper
          modules={[Navigation, Thumbs, Keyboard, Zoom]}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3 }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          initialSlide={startIndex}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
        >
          {place.images.map((image, index) => (
            <SwiperSlide key={`${image}-${index}`} className="flex items-center justify-center overflow-hidden">
              <div className="swiper-zoom-container h-full w-full flex items-center justify-center">
                <img
                  src={image}
                  alt={`${place.name} gallery image ${index + 1}`}
                  className="max-h-full max-w-full object-contain select-none"
                  loading={index === startIndex ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all hidden sm:flex border border-white/10">
          <FiChevronLeft size={24} />
        </button>
        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all hidden sm:flex border border-white/10">
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Footer / Thumbnails */}
      <div className="bg-black/80 backdrop-blur-md pt-2 pb-6 px-4 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView="auto"
            spaceBetween={10}
            watchSlidesProgress
            centerInsufficientSlides
            centeredSlides
            centeredSlidesBounds
            className="thumbnails-swiper !py-2"
          >
            {place.images.map((image, index) => (
              <SwiperSlide 
                key={`thumb-${image}-${index}`} 
                className="!w-[60px] sm:!w-[80px] md:!w-[100px] cursor-pointer"
              >
                <div 
                  className={`relative aspect-video rounded-md overflow-hidden transition-all duration-300 ${
                    activeIndex === index 
                      ? "ring-2 ring-link scale-110 z-10" 
                      : "opacity-40 hover:opacity-100 ring-1 ring-white/20"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-zoom-container {
          cursor: zoom-in;
        }
        .swiper-slide-zoomed .swiper-zoom-container {
          cursor: zoom-out;
        }
        @media (max-width: 640px) {
          .custom-next, .custom-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
