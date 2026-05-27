"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface PortfolioGalleryProps {
  images?: Array<{ src: string; alt: string }>;
  className?: string;
}

export function PortfolioGallery({ images: customImages, className = "" }: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultImages = [
    { src: "/mythical_1.webp", alt: "Manananggal Card" },
    { src: "/mythical_2.webp", alt: "Aswang Card" },
    { src: "/rare_1.webp", alt: "Mount Uwe Card" },
    { src: "/rare_2.webp", alt: "Kulam Card" },
    { src: "/mythical_1.webp", alt: "Logo Design" },
    { src: "/rare_2.webp", alt: "Poster Design" },
    { src: "/mythical_2.webp", alt: "Game Map" },
    { src: "/rare_1.webp", alt: "Brand Identity" },
  ];

  const images = customImages || defaultImages;

  return (
    <section className={`relative py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto bg-background/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="relative z-10 text-center pt-16 pb-8 px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">Browse my works</h2>
          <Link
            to="/works"
            className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors group mb-20"
          >
            <span>View All Works</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3D overlapping layout */}
        <div className="relative overflow-hidden h-[400px] -mb-[200px]">
          <div className="flex -space-x-72 md:-space-x-80 pb-8 pt-40 items-end justify-center">
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
                    className="relative aspect-[3/4] w-48 md:w-56 lg:w-64 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
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
