"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function TourPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const t = useTranslations("Tour");

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (document.fullscreenElement) {
        setIsInteracting(true);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from bubbling
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  return (
    <>
      {/* FAST LOAD OPTIMIZATION: 
        Forces the browser to download and cache the virtual tour assets 
        in parallel while the rest of the Next.js page is rendering.
      */}
      <link rel="preload" href="/virtual-tour/index.html" as="document" />
      
      <div
        ref={containerRef}
        onMouseLeave={() => !isFullscreen && setIsInteracting(false)}
        className={`
          relative bg-black overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ease-out group/tour
          ${isFullscreen 
            ? "w-screen h-screen rounded-none" 
            : "w-full h-[300px] sm:h-[400px] md:h-[500px] border border-gray-200 hover:shadow-2xl"
          }
        `}
      >
        {isFullscreen && (
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={(e) => toggleFullscreen(e)}
              className="bg-black/70 hover:bg-black text-white font-semibold py-2 px-4 rounded-full shadow-lg backdrop-blur-md transition border border-white/20 text-sm flex items-center gap-2"
            >
              <Minimize2 className="w-4 h-4" />
              Exit Fullscreen
            </button>
          </div>
        )}

        {/* 2. SCROLL PROTECTION OVERLAY (Disappears on click) */}
        {!isInteracting && !isFullscreen && (
          <div 
            onClick={() => setIsInteracting(true)}
            className="absolute inset-0 bg-black/5 hover:bg-black/20 transition-colors duration-300 z-20 flex items-center justify-center cursor-pointer"
          >
            <span className="font-medium text-xs sm:text-sm text-white drop-shadow-md bg-black/70 px-4 py-2 rounded-full border border-white/10 opacity-100 group-hover/tour:opacity-100 transition-opacity pointer-events-none">
              {t("clickToInteract")}
            </span>
          </div>
        )}

        {/* 3. DYNAMIC RIGHT-SIDE HOVER CONTROLLER (Only shows when mouse moves to the right) */}
        {!isFullscreen && (
          <div 
            onClick={(e) => toggleFullscreen(e)}
            className="absolute right-0 top-0 bottom-0 w-1/3 max-w-[180px] z-30 flex items-center justify-center cursor-pointer pointer-events-none"
          >
            <div className="pointer-events-auto flex flex-col items-center gap-2 translate-x-8 opacity-0 group-hover/tour:translate-x-0 group-hover/tour:opacity-100 transition-all duration-300 ease-in-out pr-4 sm:pr-6">
              <div className="p-3.5 bg-black/70 hover:bg-[#0157A4] backdrop-blur-md rounded-full border border-white/20 shadow-xl transition-colors transform active:scale-95">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-xs tracking-wider uppercase text-white drop-shadow-md bg-black/60 px-2.5 py-1 rounded-md border border-white/10 whitespace-nowrap">
                Full Screen
              </span>
            </div>
          </div>
        )}

        <iframe
          src="/virtual-tour/index.html"
          title="Marzipano Virtual Tour"
          loading="eager"
          className={`w-full h-full border-0 relative z-10 transition-all ${
            isInteracting ? "pointer-events-auto" : "pointer-events-none"
          }`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
          allowFullScreen
        />
      </div>
    </>
  );
}