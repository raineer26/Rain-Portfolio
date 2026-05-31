"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  videoSrc?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  className?: string;
  onActiveChange?: (index: number) => void;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 };
const TAP_SPRING = { type: "spring" as const, stiffness: 450, damping: 18, mass: 1 };

export function FocusRail({ items, initialIndex = 0, className, onActiveChange }: FocusRailProps) {
  const [active, setActive] = useState(initialIndex);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  React.useEffect(() => { onActiveChange?.(activeIndex); }, [activeIndex, onActiveChange]);

  const handlePrev = React.useCallback(() => setActive((p) => p - 1), []);
  const handleNext = React.useCallback(() => setActive((p) => p + 1), []);

  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 20) {
        delta > 0 ? handleNext() : handlePrev();
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -10000) handleNext();
    else if (swipe > 10000) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn("group relative flex h-[calc(100vh-12rem)] w-full flex-col overflow-hidden bg-neutral-950 text-white outline-none select-none rounded-2xl", className)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src={activeItem.imageSrc} alt="" className="h-full w-full object-cover blur-3xl saturate-200" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage — two-column on md+, stacked on mobile */}
      <div className="relative z-10 flex flex-1 flex-col md:flex-row items-center justify-center px-4 md:px-8 gap-4 md:gap-8">
        {/* Left: Card carousel */}
        <motion.div
          className="relative flex h-[45%] md:h-[70%] w-full md:w-[60%] items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: 1200 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const index = wrap(0, count, active + offset);
            const item = items[index];
            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            return (
              <motion.div
                key={active + offset}
                className={cn(
                  "absolute w-[40vmin] md:w-[40vmin] rounded-2xl border-t border-white/20 overflow-hidden shadow-2xl",
                  isCenter ? "z-20" : "z-10"
                )}
                initial={false}
                animate={{
                  x: offset * Math.min(350, Math.max(160, typeof window !== "undefined" ? window.innerWidth * 0.2 : 260)),
                  z: -dist * 180,
                  scale: isCenter ? 1 : 0.85,
                  rotateY: offset * -20,
                  opacity: isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5),
                  filter: `blur(${isCenter ? 0 : dist * 6}px) brightness(${isCenter ? 1 : 0.5})`,
                }}
                transition={(val: string) => val === "scale" ? TAP_SPRING : BASE_SPRING}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => { if (offset !== 0) setActive((p) => p + offset); }}
              >
                {item.videoSrc ? (
                  offset === 0 ? <div className="w-full aspect-video rounded-2xl overflow-hidden"><iframe src={item.videoSrc} className="w-full h-full" allowFullScreen /></div> : <div className="w-full aspect-video rounded-2xl bg-muted/30 flex items-center justify-center text-muted-foreground text-sm">▶ Video</div>
                ) : (
                  <img src={item.imageSrc} alt={item.title} className={`w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-2xl ${offset === 0 ? "cursor-zoom-in" : ""}`} onClick={(e) => { if (offset === 0) { e.stopPropagation(); setZoomSrc(item.imageSrc); } }} />
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right: Info & Controls */}
        <div className="flex flex-col items-center md:items-start justify-center w-full md:w-[40%] gap-4">
          <div className="flex flex-col items-center text-center md:items-start md:text-left justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">{activeItem.meta}</span>
                )}
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight md:text-3xl text-white">{activeItem.title}</h2>
                {activeItem.description && (
                  <p className="max-w-md text-sm sm:text-base text-neutral-400">{activeItem.description}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-neutral-900/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
            <button onClick={handlePrev} className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-[40px] text-center text-xs font-mono text-neutral-500">{activeIndex + 1} / {count}</span>
            <button onClick={handleNext} className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Zoom overlay */}
      <AnimatePresence>
        {zoomSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomSrc(null)}
          >
            <button onClick={() => setZoomSrc(null)} className="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer"><X className="w-6 h-6" /></button>
            <img src={zoomSrc} alt="" className="max-w-full max-h-[90vh] object-contain rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
