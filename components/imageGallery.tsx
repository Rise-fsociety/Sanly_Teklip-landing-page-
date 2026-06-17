"use client";

import { useState } from "react";
import { LazyImage } from "@/components/lazyImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { X} from "lucide-react";
import "swiper/css";
import Image from "next/image";


const MY_IMAGES = [
  { src: "/gallery/galleryStarting.webp", orientation: "portrait" }, 
  { src: "/gallery/cashboxHero.webp", orientation: "landscape" }, 
  { src: "/gallery/cashboxPortrait.webp", orientation: "portrait" }, 
  { src: "/gallery/sitting.webp", orientation: "portrait" }, 
  { src: "/gallery/advertisement.webp", orientation: "portrait" }, 
  { src: "/gallery/skanner.webp", orientation: "landscape" }, 
  { src: "/gallery/monoblokHero.webp", orientation: "landscape" }, 
  { src: "/gallery/kassa.webp", orientation: "landscape" }, 
];

export function ImageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const columns = [
    [MY_IMAGES[0], MY_IMAGES[5]],
    [MY_IMAGES[7], MY_IMAGES[2]],
    [MY_IMAGES[3], MY_IMAGES[6]],
    [MY_IMAGES[1], MY_IMAGES[4]],
  ];

  const openModalAtImage = (src: string) => {
    const globalIndex = MY_IMAGES.findIndex((img) => img.src === src);
    if (globalIndex !== -1) {
      setActiveIndex(globalIndex);
      setIsOpen(true);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center md:mt-20 py-10">
      <div className="mx-auto grid container px-4 grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 md:gap-6">
        {columns.map((columnImages, colIndex) => (
          <div className="grid gap-2 sm:grid-gap-4 h-fit" key={colIndex}>
            {columnImages.map((image, imgIndex) => {
              if (!image) return null;

              const isPortrait = image.orientation === "portrait";
              const width = isPortrait ? 1080 : 1200;
              const height = isPortrait ? 1920 : 1200;
              const ratio = isPortrait ? 9 / 16 : 6 / 5;

              return (
                <div
                  key={`${colIndex}-${imgIndex}`}
                  onClick={() => openModalAtImage(image.src)}
                  className="cursor-pointer transition-transform active:scale-95">
                  <LazyImage
                    alt={`Image ${colIndex}-${imgIndex}`}
                    containerClassName="cn-rounded"
                    fallback={`https://placehold.co/${width}x${height}/`}
                    inView={true}
                    ratio={ratio}
                    src={image.src}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/95 backdrop-blur-sm select-none">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="size-6" />
          </button>

          <div className="w-full h-full max-w-4xl max-h-[85vh] px-4">
            <Swiper
              initialSlide={activeIndex}
              spaceBetween={20}
              slidesPerView={1}
              grabCursor={true}
              className="w-full h-full">
              {MY_IMAGES.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex items-center justify-center h-full">
                  <div className="relative w-full h-[75vh] md:h-[80vh] max-w-4xl mx-auto flex items-center justify-center">
                    <Image
                      src={image.src}
                      alt={`Slide ${idx}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority={idx === activeIndex}
                      className="object-contain rounded-lg pointer-events-none"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="absolute bottom-6 text-white/40 text-xs tracking-wider">
            ← Листайте влево или вправо для просмотра →
          </div>
        </div>
      )}
    </div>
  );
}