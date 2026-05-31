import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"scene1" | "wipe" | "scene2" | "done">("scene1");

  const cols = 14;
  const rows = 8;

  // Generate wave-pattern delays for each cell
  const delays = useMemo(() => {
    const d: number[][] = [];
    for (let y = 0; y < rows; y++) {
      d[y] = [];
      for (let x = 0; x < cols; x++) {
        // Wave from center outward
        const dist = Math.hypot(x - (cols - 1) / 2, y - (rows - 1) / 2);
        const maxDist = Math.hypot((cols - 1) / 2, (rows - 1) / 2);
        d[y][x] = (dist / maxDist) * 0.8; // 0 to 0.8s delay spread
      }
    }
    return d;
  }, []);

  useEffect(() => {
    // Scene 1 shows for 1.5s, then wipe starts
    const t1 = setTimeout(() => setPhase("wipe"), 1500);
    // Wipe takes ~1.5s, then scene 2 shows
    const t2 = setTimeout(() => setPhase("scene2"), 2800);
    // Scene 2 shows for 1.5s, then done
    const t3 = setTimeout(() => setPhase("done"), 4500);
    // Trigger complete after slide-up finishes
    const t4 = setTimeout(() => onComplete(), 5300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const floatingIcons = [
    { src: "/cute-icon-1.png", size: "w-32 sm:w-44", top: "5%", left: "5%", delay: 0, duration: 5 },
    { src: "/cute-icon-2.png", size: "w-24 sm:w-36", top: "15%", right: "8%", delay: 0.5, duration: 4 },
    { src: "/cute-icon-1.png", size: "w-20 sm:w-28", bottom: "20%", left: "12%", delay: 1, duration: 4.5 },
    { src: "/cute-icon-2.png", size: "w-28 sm:w-40", bottom: "10%", right: "6%", delay: 0.3, duration: 5.5 },
    { src: "/cute-icon-1.png", size: "w-16 sm:w-24", top: "50%", left: "3%", delay: 0.7, duration: 3.5 },
    { src: "/cute-icon-2.png", size: "w-20 sm:w-32", top: "40%", right: "3%", delay: 1.2, duration: 4.2 },
    { src: "/cute-icon-1.png", size: "w-36 sm:w-48", top: "60%", left: "35%", delay: 0.4, duration: 6 },
    { src: "/cute-icon-2.png", size: "w-14 sm:w-20", top: "8%", left: "45%", delay: 0.9, duration: 3.8 },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-700 ease-in-out ${
        phase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Floating icons (visible in both scenes) */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {floatingIcons.map((icon, i) => (
          <motion.img
            key={i}
            src={icon.src}
            alt=""
            className={`absolute ${icon.size}`}
            style={{ top: icon.top, left: icon.left, right: icon.right, bottom: icon.bottom, opacity: 0 }}
            animate={{
              y: [-12, 12, -12],
              rotate: [-5, 5, -5],
              scale: [0.95, 1.05, 0.95],
              opacity: [0.06, 0.12, 0.06],
            }}
            transition={{ duration: icon.duration, repeat: Infinity, delay: icon.delay, ease: "easeInOut" }}
          />
        ))}
      </div>
      {/* Scene 2 (underneath) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#0f172a] to-[#0c0c0c] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === "scene2" || phase === "done" ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={phase === "scene2" || phase === "done" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm tracking-[0.4em] text-primary/70 uppercase mb-6 font-black"
          >
            Welcome to
          </motion.p>
          <motion.img
            src="/art_of_rain.png"
            alt="Art of Rain"
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={phase === "scene2" || phase === "done" ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto"
          />
        </motion.div>
      </div>

      {/* Grid overlay (pixelate wipe) */}
      <div
        className="absolute inset-0 grid pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const x = i % cols;
          const y = Math.floor(i / cols);
          const delay = delays[y][x];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 1 }}
              animate={
                phase === "wipe" || phase === "scene2" || phase === "done"
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.3, delay: phase === "wipe" ? delay : 0 }}
              className="bg-[#0a0a0a]"
            />
          );
        })}
      </div>

      {/* Scene 1 (on top, fades out during wipe) */}
      <AnimatePresence>
        {phase === "scene1" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center px-4"
            >
              <p className="text-xs sm:text-sm tracking-[0.4em] text-muted-foreground uppercase mb-4 font-black">Step into</p>
              <img src="/world_of_creativity.png" alt="A World of Creativity" className="w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
