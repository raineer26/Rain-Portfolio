"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface PortfolioGalleryProps {
  images?: Array<{ src: string; alt: string }>;
  className?: string;
  cardsOnly?: boolean;
}

export function PortfolioGallery({ images: customImages, className = "", cardsOnly = false }: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultImages = [
    { src: "/cards/mythical_1.webp", alt: "Manananggal Card" },
    { src: "/cards/mythical_2.webp", alt: "Aswang Card" },
    { src: "/cards/whale_CARD.webp", alt: "Whale Card" },
    { src: "/cards/eagle_CARD.webp", alt: "Eagle Card" },
    { src: "/logos/LOGO_mathpulse_ai.webp", alt: "MathPulse AI Logo" },
    { src: "/maps/MAP_gora_na_explorer.webp", alt: "Gora Na Explorer Map" },
    { src: "/cards/tarsier_CARD.webp", alt: "Tarsier Card" },
  ];

  const images = customImages || defaultImages;

  if (cardsOnly) {
    const cardImages = images.filter(img => img.src.includes("/cards/"));
    return (
      <div className={`relative overflow-visible ${className}`}>
        <div className="flex -space-x-60 md:-space-x-64 items-end justify-center">
          {cardImages.map((image, index) => {
            const totalImages = cardImages.length;
            const middle = Math.floor(totalImages / 2);
            const distanceFromMiddle = Math.abs(index - middle);
            const staggerOffset = 80 - distanceFromMiddle * 15;
            const zIndex = totalImages - index;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
            const yOffset = isHovered ? -40 : isOtherHovered ? 0 : -staggerOffset;

            return (
              <motion.div
                key={index}
                className="group cursor-pointer flex-shrink-0"
                style={{ zIndex }}
                initial={{ transform: `perspective(5000px) rotateY(-45deg) translateY(100px)`, opacity: 0 }}
                animate={{ transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`, opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div
                  className="relative aspect-[3/4] w-36 md:w-44 lg:w-52 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                  style={{ boxShadow: "rgba(0,0,0,0.25) 20px 0px 20px 0px" }}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className={`relative py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto bg-background/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="relative z-10 text-center pt-16 pb-8 px-8">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-black text-foreground mb-4 uppercase tracking-tight">Browse my works</h2>
          <p className="text-[clamp(0.9rem,2vw,1.25rem)] text-muted-foreground max-w-lg mx-auto mb-8">
            The full collection — illustrations, logos, maps, and card designs all in one place.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/works"
              className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-bold hover:bg-foreground/90 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] group mb-20"
            >
              <span>View All Works</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 3D overlapping layout */}
        <div className="relative overflow-hidden h-[250px] md:h-[400px] -mb-[120px] md:-mb-[200px]">
          <div className="flex -space-x-52 md:-space-x-80 pb-8 pt-20 md:pt-40 items-end justify-center">
            {images.map((image, index) => {
              const totalImages = images.length;
              const middle = Math.floor(totalImages / 2);
              const distanceFromMiddle = Math.abs(index - middle);
              const staggerOffset = 120 - distanceFromMiddle * 20;
              const zIndex = totalImages - index;
              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset;

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ zIndex }}
                  initial={{ transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`, opacity: 0 }}
                  animate={{ transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div
                    className="relative aspect-[3/4] w-36 md:w-56 lg:w-64 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{ boxShadow: "rgba(0,0,0,0.25) 20px 0px 20px 0px" }}
                  >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
