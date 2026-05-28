import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FlowArt, FlowSection } from "@/components/ui/story-scroll";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import { Badge } from "@/components/ui/badge";

const GAME_ART_SLIDES = [
  "/cards/mythical_1.webp",
  "/cards/mythical_2.webp",
  "/cards/rare_1.webp",
  "/cards/rare_2.webp",
  "/cards/whale_CARD.webp",
  "/cards/carabao_CARD.webp",
  "/cards/eagle_CARD.webp",
  "/cards/tarsier_CARD.webp",
];

const BRAND_SLIDES = [
  "/logos/LOGO_gora_na_explorer.webp",
  "/logos/LOGO_mathpulse_ai.webp",
  "/maps/MAP_gora_na_explorer.webp",
];

function SlideshowBg({ images, side = "right" }: { images: string[]; side?: "left" | "right" }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`absolute ${side === "right" ? "right-0" : "left-0"} top-0 w-[55%] h-full pointer-events-none`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className={`absolute ${side === "right" ? "right-[-5%]" : "left-[-5%]"} top-1/2 -translate-y-1/2 h-[110%] object-contain ${side === "right" ? "rotate-[-8deg]" : "rotate-[8deg]"}`}
          style={{ maskImage: `linear-gradient(to ${side}, transparent 0%, black 40%)`, WebkitMaskImage: `linear-gradient(to ${side}, transparent 0%, black 40%)` }}
        />
      </AnimatePresence>
    </div>
  );
}

function ScrollProgressBar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const [activePoint, setActivePoint] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [trackHeight, setTrackHeight] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const y = useTransform(scrollYProgress, [0, 1], [0, trackHeight - 56]);

  useEffect(() => {
    if (trackRef.current) setTrackHeight(trackRef.current.offsetHeight);
    const handleResize = () => { if (trackRef.current) setTrackHeight(trackRef.current.offsetHeight); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const newPoint = v < 0.33 ? 0 : v < 0.66 ? 1 : 2;
      if (newPoint !== activePoint) {
        setActivePoint(newPoint);
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, activePoint]);

  return (
    <div className="absolute right-6 md:right-10 top-0 bottom-0 z-20 hidden md:flex flex-col items-center">
      {/* Track line with gradient */}
      <div ref={trackRef} className="relative h-full w-[2px] rounded-full bg-gradient-to-b from-purple-500/30 via-emerald-500/30 to-pink-500/30">
        {/* 3 progress points */}
        {[0, 50, 100].map((pos, i) => (
          <motion.div
            key={pos}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${pos}%` }}
            animate={i === activePoint ? { scale: [1, 1.4, 1], opacity: 1 } : { scale: 1, opacity: 0.5 }}
            transition={{ duration: 0.4 }}
          >
            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${i === activePoint ? "bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" : "bg-white/20 border-white/40"}`} />
          </motion.div>
        ))}

        {/* Sliding icon */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ y }}
        >
          <motion.img
            src="/progress_bar_icon.png"
            alt="progress"
            style={{ rotate }}
            className="w-14 h-14 drop-shadow-[0_0_10px_rgba(200,120,255,0.5)]"
            animate={pulse ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function WorksPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="relative">
      {/* Intro header */}
      <div className="flex flex-col items-center gap-4 text-center py-12 relative z-10">
        <Badge variant="outline">Artworks</Badge>
        <img src="/creative_works.png" alt="Creative Works" className="w-full max-w-[80vw] sm:max-w-sm md:max-w-lg -mt-6 -rotate-2 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer" />
        <p className="text-muted-foreground max-w-lg text-sm md:text-base">
          A curated selection of my creative work across different categories.
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <ScrollProgressBar containerRef={sectionRef} />

        <FlowArt>
          {/* Section 1: Game Art */}
          <FlowSection className="!min-h-0" style={{ color: "#fff" }}>
            <div className="absolute inset-0 pointer-events-none opacity-70" style={{ backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)" }} />
            <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(120,80,200,0.25)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(100,50,200,0.15)_0%,transparent_70%)] pointer-events-none" />
            <SlideshowBg images={GAME_ART_SLIDES} side="right" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 flex-1 relative z-10">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300 mb-3">01 — Game Art</p>
                <h2 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] uppercase tracking-tight">
                  Cards<br />& Maps
                </h2>
                <hr className="my-[1.5vw] border-t border-white/20" />
                <p className="max-w-[40ch] text-[clamp(0.85rem,1.6vw,1.1rem)] font-normal leading-relaxed text-white/70">
                  Mythical creature illustrations and fantasy world maps designed for immersive tabletop gaming experiences.
                </p>
                <span className="inline-block mt-3 text-xs font-bold text-purple-300/60 uppercase tracking-widest">8 cards • 1 map</span>
              </div>
              <div className="relative flex-1 flex items-center justify-center">
                {/* Fanned cards behind */}
                <img src="/cards/mythical_1.webp" alt="" className="absolute w-32 md:w-44 rounded-lg opacity-40 rotate-[-12deg] translate-x-[-40%] translate-y-[10%] z-0" />
                <img src="/cards/rare_1.webp" alt="" className="absolute w-32 md:w-44 rounded-lg opacity-30 rotate-[10deg] translate-x-[40%] translate-y-[-10%] z-0" />
                <img src="/cards/eagle_CARD.webp" alt="" className="absolute w-28 md:w-36 rounded-lg opacity-25 rotate-[20deg] translate-x-[20%] translate-y-[30%] z-0" />
                <motion.img
                  src="/preview_game.png"
                  alt="Siren illustration"
                  className="relative z-10 h-[40vh] md:h-[55vh] max-h-[400px] object-contain drop-shadow-[0_20px_60px_rgba(100,50,200,0.3)] cursor-pointer animate-[float_4s_ease-in-out_infinite]"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                />
              </div>
            </div>
          </FlowSection>

          {/* Section 2: Brand & Print — flipped */}
          <FlowSection className="!min-h-0" style={{ color: "#fff" }}>
            <div className="absolute inset-0 pointer-events-none opacity-70" style={{ backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)" }} />
            <div className="absolute -top-[15%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(50,200,150,0.2)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -bottom-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(80,150,200,0.12)_0%,transparent_70%)] pointer-events-none" />
            <SlideshowBg images={BRAND_SLIDES} side="left" />

            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 md:gap-10 flex-1 relative z-10">
              <div className="flex-1 md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 mb-3">02 — Brand & Print</p>
                <h2 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] uppercase tracking-tight">
                  Logos &<br />Posters
                </h2>
                <hr className="my-[1.5vw] border-t border-white/20" />
                <p className="max-w-[40ch] text-[clamp(0.85rem,1.6vw,1.1rem)] font-normal leading-relaxed text-white/70 md:ml-auto">
                  Brand identities and promotional designs that communicate bold ideas through clean typography and striking visuals.
                </p>
                <span className="inline-block mt-3 text-xs font-bold text-emerald-300/60 uppercase tracking-widest">2 logos • 1 map</span>
              </div>
              <div className="relative flex-1 flex items-center justify-center">
                {/* Fanned cards behind */}
                <img src="/logos/LOGO_mathpulse_ai.webp" alt="" className="absolute w-32 md:w-44 rounded-lg opacity-40 rotate-[12deg] translate-x-[35%] translate-y-[10%] z-0" />
                <img src="/maps/MAP_gora_na_explorer.webp" alt="" className="absolute w-32 md:w-44 rounded-lg opacity-30 rotate-[-10deg] translate-x-[-35%] translate-y-[-10%] z-0" />
                <motion.img
                  src="/logos/LOGO_gora_na_explorer.webp"
                  alt="Brand preview"
                  className="relative z-10 h-[40vh] md:h-[55vh] max-h-[400px] object-contain drop-shadow-[0_20px_60px_rgba(50,200,150,0.3)] cursor-pointer animate-[float_4s_ease-in-out_infinite_0.5s]"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                />
              </div>
            </div>
          </FlowSection>

          {/* Section 3: Gallery Preview + CTA */}
          <FlowSection className="!min-h-0" style={{ color: "#fff" }}>
            <div className="absolute inset-0 pointer-events-none opacity-70" style={{ backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)" }} />
            <div className="absolute -top-[15%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,120,255,0.18)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -bottom-[20%] -right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(120,80,200,0.15)_0%,transparent_70%)] pointer-events-none" />
            <SlideshowBg images={[...GAME_ART_SLIDES.slice(0, 4), ...BRAND_SLIDES.slice(0, 2)]} />

            <PortfolioGallery />
          </FlowSection>
        </FlowArt>
      </div>
    </div>
  );
}
