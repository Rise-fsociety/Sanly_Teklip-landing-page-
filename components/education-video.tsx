"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const VideoPlayer = ({ style, ...props }: ComponentProps<typeof MediaController>) => (
  <MediaController style={{ ...style }} {...props} />
);

export const VideoPlayerControlBar = (props: ComponentProps<typeof MediaControlBar>) => (
  <MediaControlBar {...props} />
);

export const VideoPlayerTimeRange = ({ className, ...props }: ComponentProps<typeof MediaTimeRange>) => (
  <MediaTimeRange
    className={cn("[--media-range-thumb-opacity:1] [--media-range-track-height:4px] flex-1 mx-4", className)}
    {...props}
  />
);

export const VideoPlayerPlayButton = ({ className, ...props }: ComponentProps<typeof MediaPlayButton>) => (
  <MediaPlayButton className={cn("text-white bg-transparent hover:text-slate-200 transition-colors", className)} {...props} />
);

export const VideoPlayerMuteButton = ({ className, ...props }: ComponentProps<typeof MediaMuteButton>) => (
  <MediaMuteButton className={cn("text-white bg-transparent hover:text-slate-200 transition-colors", className)} {...props} />
);

export const VideoPlayerVolumeRange = ({ className, ...props }: ComponentProps<typeof MediaVolumeRange>) => (
  <MediaVolumeRange className={cn("w-20 md:w-24 text-white [--media-range-track-height:4px]", className)} {...props} />
);

interface VideoItem {
  id: string;
  title: string;
  src: string;
}

const VIDEO_COLLECTION: VideoItem[] = [
  { id: "v1", title: "Install_Akhasap", src: "/ak-hasap/Install_Akhasap.mp4" },
  { id: "v2", title: "Akhasap_video", src: "/ak-hasap/Akahasp_video.mp4" },
  { id: "v3", title: "Akhasap_chek_duzetmek", src: "/ak-hasap/Akhasap_chek_duzetme.mp4" },
  { id: "v4", title: "Any_Desk_install", src: "/ak-hasap/Any_Desk_install.mp4" },
  { id: "v5", title: "Aplication", src: "/ak-hasap/aplication.mp4" },
  { id: "v6", title: "haryt_aluw_etmek", src: "/ak-hasap/haryt_aluw_etme.mp4" },
  { id: "v7", title: "Haryt_baha_Yazdyr", src: "/ak-hasap/Haryt_baha_Yazdyr.mp4" },
  { id: "v8", title: "haryt_girmek", src: "/ak-hasap/haryt_girme.mp4" },
  { id: "v9", title: "haryt_surat_goymak", src: "/ak-hasap/haryt_surat_goyma.mp4" },
  { id: "v10", title: "Kassa_doretmek", src: "/ak-hasap/Kassa_doretmek.mp4" },
  { id: "v11", title: "Mushderileri_internede_goybermek", src: "/ak-hasap/mushderileri_internede_goyberme.mp4" },
  { id: "v12", title: "Sargytlary_chykarmak", src: "/ak-hasap/sargytlary_chykarma.mp4" },
  { id: "v13", title: "Taze_alyjy_acalyn", src: "/ak-hasap/Taze_alyjy_acalyn.mp4" },
  { id: "v14", title: "Taze_haryt_açylys", src: "/ak-hasap/Taze_haryt_açylys.mp4" },
  { id: "v15", title: "Tel_goshmak", src: "/ak-hasap/tel_goshma.mp4" },
  { id: "v16", title: "Tel_goshmak2", src: "/ak-hasap/tel_goshma_2.mp4" },
  { id: "v17", title: "Toleg almak we Toleg bermek", src: "/ak-hasap/Toleg almak we Toleg bermek.mp4" },
  { id: "v18", title: "Zaya we ulanylan harytlar", src: "/ak-hasap/zaya we ulanylan harytlar.mp4" },
];

export const EducationVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const router = useRouter();
  const t = useTranslations('Header');

  const handleDownload = (e: React.MouseEvent, src: string, filename: string) => {
    e.stopPropagation(); 
    const link = document.createElement("a");
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="mx-auto container px-4">
        <div className="mb-8 flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors group"
            title="Go to previous page"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            {t('backHome')}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_COLLECTION.map((video) => (
            <div key={video.id} className="flex flex-col gap-3 group">
              <div
                onClick={() => setSelectedVideo(video)}
                className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-slate-900"
              >
                <video
                  preload="metadata"
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-90 grayscale-[20%] transition-opacity group-hover:opacity-100"
                >
                  <source src={`${video.src}#t=0.001`} type="video/mp4" />
                </video>
              </div>

              <div className="flex items-start justify-between gap-4 px-1">
                <p className="text-sm font-medium tracking-tight text-slate-800 md:text-lg">
                  {video.title}
                </p>
                <button
                  onClick={(e) => handleDownload(e, video.src, `${video.title}.mp4`)}
                  className="flex items-center justify-center p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                  title="Download File"
                >
                  <Download className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <VideoPopOver video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export const VideoPopOver = ({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) => {
  const triggerModalDownload = () => {
    const link = document.createElement("a");
    link.href = video.src;
    link.download = `${video.title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="relative w-screen h-screen bg-black"
      >
        <VideoPlayer style={{ width: "100vw", height: "100vh" }}>
          <video
            src={video.src}
            autoPlay
            slot="media"
            className="w-full h-full object-contain"
            style={{ width: "100%", height: "100%" }}
          />
          
          <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-md bg-black/40 border border-white/10 p-2.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              title="Close Player"
            >
              <ArrowLeft className="size-4" />
            </button>
          </div>
          
          <div className="absolute right-6 top-6 z-10 flex items-center gap-2">
            <button
              onClick={triggerModalDownload}
              className="flex items-center justify-center rounded-md bg-black/40 border border-white/10 p-2.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              title="Download Source Video"
            >
              <Download className="size-4" />
            </button>
          </div>
          
          <VideoPlayerControlBar className="absolute bottom-0 left-0 flex w-full items-center justify-between px-8 py-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <div className="flex items-center gap-2">
              <VideoPlayerPlayButton />
            </div>
            
            <VideoPlayerTimeRange className="bg-transparent" />
            
            <div className="flex items-center gap-1">
              <VideoPlayerMuteButton />
              <VideoPlayerVolumeRange />
            </div>
          </VideoPlayerControlBar>
        </VideoPlayer>
      </motion.div>
    </div>
  );
};