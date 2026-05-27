import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FlowArt, FlowSection } from "@/components/ui/story-scroll";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";

export function WorksPreview() {
  return (
    <FlowArt>
      {/* Section 1: Game Art */}
      <FlowSection style={{ backgroundColor: "#1a0a2e", color: "#fff" }}>
        {/* Faded card covering right half, tilted */}
        <div className="absolute right-0 top-0 w-[55%] h-full pointer-events-none overflow-hidden">
          <img
            src="/mythical_1.webp"
            alt=""
            className="absolute right-[-5%] top-1/2 -translate-y-1/2 h-[110%] object-contain opacity-10 rotate-[-8deg]"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 40%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)" }}
          />
        </div>

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
              className="relative z-10 h-[75vh] max-h-[600px] object-contain drop-shadow-[0_20px_60px_rgba(100,50,200,0.3)]"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </FlowSection>

      {/* Section 2: Brand & Print */}
      <FlowSection style={{ backgroundColor: "#0a2a2a", color: "#fff" }}>
        {/* Faded card covering right half, tilted */}
        <div className="absolute right-0 top-0 w-[55%] h-full pointer-events-none overflow-hidden">
          <img
            src="/rare_2.webp"
            alt=""
            className="absolute right-[-5%] top-1/2 -translate-y-1/2 h-[110%] object-contain opacity-10 rotate-[-8deg]"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 40%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)" }}
          />
        </div>

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
              src="/preview_game.png"
              alt="Brand preview"
              className="relative z-10 h-[75vh] max-h-[600px] object-contain drop-shadow-[0_20px_60px_rgba(50,200,150,0.3)]"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </FlowSection>

      {/* Section 3: Gallery Preview + CTA */}
      <FlowSection style={{ backgroundColor: "#0a0a0a", color: "#fff" }}>
        <PortfolioGallery />
      </FlowSection>
    </FlowArt>
  );
}
