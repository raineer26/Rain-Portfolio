import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { FlowArt, FlowSection } from "@/components/ui/story-scroll";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";

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

function SlideshowBg({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute right-0 top-0 w-[55%] h-full pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 h-[110%] object-contain rotate-[-8deg]"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 40%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)" }}
        />
      </AnimatePresence>
    </div>
  );
}

export function WorksPreview() {
  return (
    <FlowArt>
      {/* Section 1: Game Art */}
      <FlowSection style={{ backgroundColor: "#0a0a14", color: "#fff" }}>
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          }}
        />
        {/* Radial glows */}
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(120,80,200,0.2)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(100,50,200,0.12)_0%,transparent_70%)] pointer-events-none" />
        {/* Slideshow background */}
        <SlideshowBg images={GAME_ART_SLIDES} />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300 relative z-10">01 — Game Art</p>
        <hr className="my-[2vw] border-t border-white/20 relative z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-1 relative z-10">
          <div className="flex-1">
            <h2 className="text-[clamp(3rem,10vw,12rem)] font-black leading-[0.85] uppercase tracking-tight">
              Cards
              <br />
              & Maps
            </h2>
            <hr className="my-[2vw] border-t border-white/20" />
            <p className="max-w-[40ch] text-[clamp(0.9rem,2vw,1.5rem)] font-normal leading-relaxed text-white/70">
              Mythical creature illustrations and fantasy world maps designed for immersive tabletop gaming experiences.
            </p>
          </div>
          {/* Illustration in front */}
          <div className="relative flex-1 flex items-center justify-center">
            <motion.img
              src="/preview_game.png"
              alt="Siren illustration"
              className="relative z-10 h-[50vh] md:h-[75vh] max-h-[400px] md:max-h-[600px] object-contain drop-shadow-[0_20px_60px_rgba(100,50,200,0.3)] cursor-pointer animate-[float_4s_ease-in-out_infinite]"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
          </div>
        </div>
      </FlowSection>

      {/* Section 2: Brand & Print */}
      <FlowSection style={{ backgroundColor: "#0a0a14", color: "#fff" }}>
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          }}
        />
        {/* Radial glows */}
        <div className="absolute -top-[15%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(50,200,150,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(80,150,200,0.1)_0%,transparent_70%)] pointer-events-none" />
        {/* Slideshow background */}
        <SlideshowBg images={BRAND_SLIDES} />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 relative z-10">02 — Brand & Print</p>
        <hr className="my-[2vw] border-t border-white/20 relative z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-1 relative z-10">
          <div className="flex-1">
            <h2 className="text-[clamp(3rem,10vw,12rem)] font-black leading-[0.85] uppercase tracking-tight">
              Logos
              <br />
              & Posters
            </h2>
            <hr className="my-[2vw] border-t border-white/20" />
            <p className="max-w-[40ch] text-[clamp(0.9rem,2vw,1.5rem)] font-normal leading-relaxed text-white/70">
              Brand identities and promotional designs that communicate bold ideas through clean typography and striking visuals.
            </p>
          </div>
          {/* Illustration in front */}
          <div className="relative flex-1 flex items-center justify-center">
            <motion.img
              src="/logos/LOGO_gora_na_explorer.webp"
              alt="Brand preview"
              className="relative z-10 h-[50vh] md:h-[75vh] max-h-[400px] md:max-h-[600px] object-contain drop-shadow-[0_20px_60px_rgba(50,200,150,0.3)] cursor-pointer animate-[float_4s_ease-in-out_infinite_0.5s]"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            />
          </div>
        </div>
      </FlowSection>

      {/* Section 3: Gallery Preview + CTA */}
      <FlowSection style={{ backgroundColor: "#0a0a14", color: "#fff" }}>
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          }}
        />
        {/* Radial glows */}
        <div className="absolute -top-[15%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,120,255,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(120,80,200,0.1)_0%,transparent_70%)] pointer-events-none" />
        {/* Slideshow background */}
        <SlideshowBg images={[...GAME_ART_SLIDES.slice(0, 4), ...BRAND_SLIDES.slice(0, 2)]} />

        <PortfolioGallery />
      </FlowSection>
    </FlowArt>
  );
}
