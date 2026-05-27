import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid3X3, Layers, ArrowLeft } from "lucide-react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";
import { Badge } from "@/components/ui/badge";

type WorkItem = FocusRailItem & { category: string };

const WORKS: WorkItem[] = [
  { id: 1, title: "Manananggal", description: "A mythical creature card featuring the Filipino folklore Manananggal, designed for a tabletop strategy game with dark fantasy aesthetics.", meta: "Game Card • Mythical", imageSrc: "/mythical_1.webp", category: "Game Cards" },
  { id: 2, title: "Aswang", description: "An eerie depiction of the Aswang from Philippine mythology, illustrated as a high-tier mythical card with atmospheric horror elements.", meta: "Game Card • Mythical", imageSrc: "/mythical_2.webp", category: "Game Cards" },
  { id: 3, title: "Mount Uwe", description: "A rare volcanic entity card featuring explosive lava effects and dramatic lighting, designed to convey raw elemental power.", meta: "Game Card • Rare", imageSrc: "/rare_1.webp", category: "Game Cards" },
  { id: 4, title: "Kulam", description: "A dark magic spell card with mystical hand gestures and glowing energy orbs, representing the Filipino concept of witchcraft.", meta: "Game Card • Rare", imageSrc: "/rare_2.webp", category: "Game Cards" },
  { id: 5, title: "Startup Brand Identity", description: "A modern minimalist logo designed for a tech startup, featuring clean geometry and bold typography.", meta: "Logo Design", imageSrc: "/mythical_1.webp", category: "Logos" },
  { id: 6, title: "Coffee Shop Emblem", description: "A vintage-inspired emblem logo for an artisan coffee brand, combining hand-drawn elements with refined typographic details.", meta: "Logo Design", imageSrc: "/rare_2.webp", category: "Logos" },
  { id: 7, title: "Music Festival Poster", description: "A vibrant event poster blending surreal illustration with bold typography for a live music experience.", meta: "Poster Design", imageSrc: "/mythical_2.webp", category: "Posters" },
  { id: 8, title: "Art Exhibition Promo", description: "A gallery exhibition promotional poster with abstract compositions targeting a contemporary art audience.", meta: "Poster Design", imageSrc: "/rare_1.webp", category: "Posters" },
  { id: 9, title: "Fantasy World Map", description: "A hand-illustrated game world map featuring diverse biomes and pathways for an immersive tabletop RPG.", meta: "Game Map", imageSrc: "/rare_1.webp", category: "Maps" },
  { id: 10, title: "Island Adventure Map", description: "A tropical island exploration map with detailed terrain and hidden treasures for a mobile adventure game.", meta: "Game Map", imageSrc: "/mythical_1.webp", category: "Maps" },
];

const CATEGORIES = ["All", "Game Cards", "Logos", "Posters", "Maps"];

export function WorksPage() {
  const [view, setView] = useState<"grid" | "detail">("detail");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = activeCategory === "All" ? WORKS : WORKS.filter((w) => w.category === activeCategory);

  const handleGridClick = (index: number) => {
    setSelectedIndex(index);
    setView("detail");
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-32 w-24 h-24 border border-border/15 rounded-full pointer-events-none" />
      <div className="absolute bottom-32 left-20 w-16 h-16 border border-border/10 rotate-45 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-3 h-3 bg-primary/20 rounded-full pointer-events-none" />

      {/* Detail view full-page blurred background */}
      {view === "detail" && filtered.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <img src={filtered[0].imageSrc} alt="" className="w-full h-full object-cover blur-[80px] opacity-15 saturate-150" />
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 backdrop-blur-md pb-4 pt-2 -mx-4 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-muted/50 border border-border/50 hover:bg-muted transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Digital Works</h1>
              <p className="text-muted-foreground text-sm mt-1">Full collection of illustrations, designs, and visual projects.</p>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-1 rounded-full bg-muted/50 p-1 border border-border/50">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${view === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3X3 className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setView("detail")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${view === "detail" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Layers className="w-4 h-4" /> Detail
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground border border-border/50"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        </div>

        {/* Views */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleGridClick(index)}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img src={item.imageSrc} alt={item.title} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div>
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-white/60 text-xs">{item.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <FocusRail items={filtered} initialIndex={selectedIndex} />
        )}
      </div>
    </div>
  );
}
