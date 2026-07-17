"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, Plus } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useTranslations } from "next-intl";

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController
    style={{
      ...style,
    }}
    {...props}
  />
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const VideoPlayerTimeRange = ({
  className,
  ...props
}: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange
    className={cn(
      "[--media-range-thumb-opacity:0] [--media-range-track-height:2px]",
      className,
    )}
    {...props}
  />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const VideoPlayerTimeDisplay = ({
  className,
  ...props
}: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const VideoPlayerVolumeRange = ({
  className,
  ...props
}: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const VideoPlayerPlayButton = ({
  className,
  ...props
}: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const VideoPlayerMuteButton = ({
  className,
  ...props
}: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = ({
  className,
  ...props
}: VideoPlayerContentProps) => (
  <video className={cn("mb-0 mt-0", className)} {...props} />
);

export const IntroductionVideo = () => {
  const [showVideoPopOver, setShowVideoPopOver] = useState(false);
  const t = useTranslations('common');
  const i = useTranslations('Intro');

  const SPRING = {
    mass: 0.1,
  };

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left - 40);
    y.set(e.clientY - bounds.top - 20);
  };

  return (
    <section className="relative flex w-full justify-center px-6 pb-10 md:py-20">
      <div className="flex container mx-auto px-4 flex-col items-center justify-between gap-12 md:flex-row">
        
        <div className="flex w-full flex-col items-center gap-4 text-center md:w-1/2 md:items-start md:text-left">
          <h2 className="text-4xl font-extrabold tracking-tight text-soft-gray md:text-6xl md:leading-tight">
            Akhasap <br className="hidden md:block" /> {i('introduction')}
          </h2>
          <Link href="/akhasap" className="text-sm font-bold md:text-xl xl:text-2xl cursor-pointer tracking-widest text-blue-600 uppercase">
            {i('video')}
          </Link>
        </div>
        <div className="relative flex w-full items-center justify-center md:w-1/2">
          <AnimatePresence>
            {showVideoPopOver && (
              <VideoPopOver setShowVideoPopOver={setShowVideoPopOver} />
            )}
          </AnimatePresence>

          <div
            onMouseMove={handlePointerMove}
            onMouseLeave={() => {
              opacity.set(0);
            }}
            onClick={() => setShowVideoPopOver(true)}
            className="group relative w-full aspect-video cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-slate-100"
          >
            <motion.div
              style={{ x, y, opacity }}
              className="pointer-events-none absolute left-0 top-0 z-20 flex w-fit select-none items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md"
            >
              <Play className="size-4 fill-white" /> Play
            </motion.div>
            <video
              autoPlay
              muted
              playsInline
              loop
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/ak-hasap/akhasap_intro.mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export const VideoPopOver = ({
  setShowVideoPopOver,
}: {
  setShowVideoPopOver: (showVideoPopOver: boolean) => void;
}) => {
  return (
    <div className="fixed left-0 top-0 z-[101] flex h-screen w-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-black/80 absolute left-0 top-0 h-full w-full"
        onClick={() => setShowVideoPopOver(false)}
      ></motion.div>
      <motion.div
        initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5% )", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
        exit={{
          clipPath: "inset(43.5% 43.5% 33.5% 43.5% )",
          opacity: 0,
          transition: {
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20,
            opacity: { duration: 0.2, delay: 0.8 },
          },
        }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="relative aspect-video w-[90vw] max-w-7xl"
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }}>
          <VideoPlayerContent
            src="/ak-hasap/akhasap_intro.mp4"
            autoPlay
            slot="media"
            className="w-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />

          <span
            onClick={() => setShowVideoPopOver(false)}
            className="absolute right-2 top-2 z-10 cursor-pointer rounded-full p-1 transition-colors hover:bg-white/20"
          >
            <Plus className="size-5 rotate-45 text-black" />
          </span>
          <VideoPlayerControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center justify-center px-5 md:px-10 md:py-5">
            <VideoPlayerPlayButton className="h-4 bg-transparent text-black" />
            <VideoPlayerTimeRange className="bg-transparent [--media-time-range-buffered-color:rgba(0,0,0,0.15)] [--media-range-track-background:rgba(0,0,0,0.2)] [--media-range-bar-color:rgba(0,0,0,0.8)]" />
            <VideoPlayerMuteButton className="size-4 bg-transparent text-black" />
          </VideoPlayerControlBar>
        </VideoPlayer>
      </motion.div>
    </div>
  );
};