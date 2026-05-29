import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, Layers, ArrowLeft, ChevronDown } from "lucide-react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { BackToTop } from "@/components/ui/back-to-top";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";
import { Badge } from "@/components/ui/badge";

type WorkItem = FocusRailItem & { category: string };

const WORKS: WorkItem[] = [
  { id: 1, title: "Manananggal", description: "A mythical creature card featuring the Filipino folklore Manananggal, designed for a tabletop strategy game with dark fantasy aesthetics.", meta: "Game Card • Mythical", imageSrc: "/cards/mythical_1.webp", category: "Game Cards" },
  { id: 2, title: "Aswang", description: "An eerie depiction of the Aswang from Philippine mythology, illustrated as a high-tier mythical card with atmospheric horror elements.", meta: "Game Card • Mythical", imageSrc: "/cards/mythical_2.webp", category: "Game Cards" },
  { id: 3, title: "Mount Uwe", description: "A rare volcanic entity card featuring explosive lava effects and dramatic lighting, designed to convey raw elemental power.", meta: "Game Card • Rare", imageSrc: "/cards/rare_1.webp", category: "Game Cards" },
  { id: 4, title: "Kulam", description: "A dark magic spell card with mystical hand gestures and glowing energy orbs, representing the Filipino concept of witchcraft.", meta: "Game Card • Rare", imageSrc: "/cards/rare_2.webp", category: "Game Cards" },
  { id: 5, title: "Whale", description: "A majestic ocean creature card featuring a deep-sea whale with bioluminescent accents, designed for an aquatic expansion set.", meta: "Game Card • Rare", imageSrc: "/cards/whale_CARD.webp", category: "Game Cards" },
  { id: 6, title: "Carabao", description: "A powerful beast card depicting the iconic Filipino carabao, illustrated with earthy tones and cultural symbolism.", meta: "Game Card • Rare", imageSrc: "/cards/carabao_CARD.webp", category: "Game Cards" },
  { id: 7, title: "Eagle", description: "A legendary Philippine Eagle card with fierce detail and dynamic pose, representing the apex predator of the skies.", meta: "Game Card • Mythical", imageSrc: "/cards/eagle_CARD.webp", category: "Game Cards" },
  { id: 8, title: "Tarsier", description: "A mystical tarsier card with oversized luminous eyes, blending cute aesthetics with supernatural energy.", meta: "Game Card • Rare", imageSrc: "/cards/tarsier_CARD.webp", category: "Game Cards" },
  { id: 9, title: "Gora Na Explorer", description: "A brand identity for Gora Na Explorer, combining adventure-inspired typography with nature-themed visual elements.", meta: "Logo Design", imageSrc: "/logos/LOGO_gora_na_explorer.webp", category: "Logos" },
  { id: 10, title: "MathPulse AI", description: "A modern tech logo for MathPulse AI, featuring geometric precision and vibrant gradients that convey intelligence and innovation.", meta: "Logo Design", imageSrc: "/logos/LOGO_mathpulse_ai.webp", category: "Logos" },
  { id: 11, title: "Gora Na Explorer Map", description: "A hand-illustrated exploration map for the Gora Na Explorer project, featuring detailed terrain, trails, and points of interest.", meta: "Game Map", imageSrc: "/maps/MAP_gora_na_explorer.webp", category: "Maps" },
];

const CATEGORIES_ORDER = ["All", "Game Cards", "Logos", "Maps", "Posters"];

const CATEGORY_INFO: Record<string, { description: string; image: string }> = {
  "Game Cards": { description: "Mythical creatures, rare beasts, and legendary beings — illustrated for immersive tabletop card games.", image: "/game_cards.png" },
  "Logos": { description: "Brand identities crafted with bold typography and clean geometry for startups and creative projects.", image: "/logo_designs.png" },
  "Maps": { description: "Hand-illustrated exploration maps with detailed terrain, trails, and points of interest.", image: "/game_map.png" },
  "Posters": { description: "Vibrant promotional designs blending illustration with bold typography.", image: "/posters.png" },
};

export function WorksPage() {
  const [view, setView] = useState<"grid" | "detail">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Dynamic categories derived from data
  const categories = useMemo(() => {
    const counts = WORKS.reduce<Record<string, number>>((acc, w) => {
      acc[w.category] = (acc[w.category] || 0) + 1;
      return acc;
    }, {});
    const cats = Object.keys(counts).sort(
      (a, b) => (CATEGORIES_ORDER.indexOf(a) === -1 ? 99 : CATEGORIES_ORDER.indexOf(a)) - (CATEGORIES_ORDER.indexOf(b) === -1 ? 99 : CATEGORIES_ORDER.indexOf(b))
    );
    return [{ name: "All", count: WORKS.length }, ...cats.map((c) => ({ name: c, count: counts[c] }))];
  }, []);

  const filtered = activeCategory === "All" ? WORKS : WORKS.filter((w) => w.category === activeCategory);

  const handleGridClick = (index: number) => {
    setSelectedIndex(index);
    setView("detail");
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage: "linear-gradient(to right, oklch(0.985 0 0 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.985 0 0 / 0.06) 1px, transparent 1px)",
            maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        />
        {/* Primary radial glow — top left */}
        <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.4)_0%,transparent_70%)]" />
        {/* Secondary radial glow — bottom right */}
        <div className="absolute -bottom-[15%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.1_250/0.35)_0%,transparent_70%)]" />
        {/* Accent glow — center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.15)_0%,transparent_60%)]" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        {/* Floating shapes */}
        <div className="absolute top-[15%] right-[20%] w-32 h-32 border border-white/[0.07] rounded-full" />
        <div className="absolute bottom-[25%] left-[15%] w-20 h-20 border border-white/[0.05] rotate-45" />
        <div className="absolute top-[60%] right-[10%] w-3 h-3 bg-primary/30 rounded-full" />
        <div className="absolute top-[30%] left-[8%] w-2 h-2 bg-secondary/30 rounded-full" />
      </div>

      {/* Detail view full-page blurred background */}
      {view === "detail" && filtered.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <img src={filtered[0].imageSrc} alt="" className="w-full h-full object-cover blur-[80px] opacity-15 saturate-150" />
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="pb-4">
          {/* Top bar: back button + filter + view toggle in one row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-muted/50 border border-border/50 hover:bg-muted transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              {/* Filter dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 border border-border/30 text-sm font-semibold cursor-pointer"
                >
                  <span>{activeCategory} ({categories.find(c => c.name === activeCategory)?.count})</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {filterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 rounded-xl bg-muted/90 border border-border/30 backdrop-blur-xl overflow-hidden z-30 min-w-[160px]"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => { setActiveCategory(cat.name); setFilterOpen(false); }}
                          className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${activeCategory === cat.name ? "text-foreground bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-muted-foreground">{cat.count}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 rounded-full bg-muted/30 p-1 border border-border/30">
                {([["grid", Grid3X3], ["detail", Layers]] as const).map(([key, Icon]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setView(key)}
                    className="relative flex items-center px-2.5 py-2 rounded-full cursor-pointer z-10"
                  >
                    {view === key && (
                      <motion.span
                        layoutId="view-pill"
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className={`relative z-10 w-4 h-4 ${view === key ? "text-background" : "text-muted-foreground"}`} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Centered title */}
          <div className="text-center mb-4">
            <img src="/creative_works.png" alt="Creative Works" className="h-16 md:h-24 object-contain mx-auto -rotate-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
            <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-lg mx-auto">Full collection of illustrations, designs, and visual projects.</p>
          </div>
        </div>
        {/* Views */}
        {view === "grid" ? (
          <div>
            {activeCategory !== "All" && (
              <div className="mb-4">
                <img src={CATEGORY_INFO[activeCategory]?.image} alt={activeCategory} className="h-12 md:h-16 object-contain -rotate-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                <p className="text-muted-foreground text-sm mt-2">{CATEGORY_INFO[activeCategory]?.description}</p>
              </div>
            )}
            {activeCategory === "All" ? (
              <div className="space-y-12">
                {categories.filter(c => c.name !== "All").map((cat) => {
                  const items = WORKS.filter(w => w.category === cat.name);
                  return (
                    <div key={cat.name}>
                      <div className="mb-4">
                        <img src={CATEGORY_INFO[cat.name]?.image} alt={cat.name} className="h-12 md:h-16 object-contain -rotate-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                        <p className="text-muted-foreground text-sm mt-2">{CATEGORY_INFO[cat.name]?.description}</p>
                      </div>
                      <div className="columns-2 sm:columns-3 md:columns-5 gap-3 md:gap-4">
                        {items.map((item) => {
                          const globalIndex = filtered.findIndex(f => f.id === item.id);
                          return (
                            <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} onClick={() => handleGridClick(globalIndex)} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"; }} className="group relative rounded-xl overflow-hidden cursor-pointer transition-[box-shadow] duration-300 hover:shadow-[0_0_40px_-5px_rgba(120,80,200,0.3)] mb-3 md:mb-4 break-inside-avoid" style={{ transition: "transform 0.2s ease-out, box-shadow 0.3s ease" }}>
                              <img src={item.imageSrc} alt={item.title} className="w-full h-auto object-cover rounded-xl" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"><div><p className="text-white font-bold text-sm">{item.title}</p><p className="text-white/60 text-xs">{item.meta}</p></div></div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 md:columns-5 gap-3 md:gap-4">
                {filtered.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} onClick={() => handleGridClick(index)} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"; }} className="group relative rounded-xl overflow-hidden cursor-pointer transition-[box-shadow] duration-300 hover:shadow-[0_0_40px_-5px_rgba(120,80,200,0.3)] mb-3 md:mb-4 break-inside-avoid" style={{ transition: "transform 0.2s ease-out, box-shadow 0.3s ease" }}>
                    <img src={item.imageSrc} alt={item.title} className="w-full h-auto object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"><div><p className="text-white font-bold text-sm">{item.title}</p><p className="text-white/60 text-xs">{item.meta}</p></div></div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <FocusRail items={filtered} initialIndex={selectedIndex} />
        )}
      </div>
      <BackToTop />
    </div>
  );
}
