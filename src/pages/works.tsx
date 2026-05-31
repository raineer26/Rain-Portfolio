import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, Layers, ArrowLeft, ChevronDown } from "lucide-react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { BackToTop } from "@/components/ui/back-to-top";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";
import { Badge } from "@/components/ui/badge";

type WorkItem = FocusRailItem & { category: string; videoSrc?: string; subgroup?: string };

const WORKS: WorkItem[] = [
  // Game Cards — Character & Skills
  { id: 4, title: "Tarsier", description: "A mystical tarsier card with oversized luminous eyes, blending cute aesthetics with supernatural energy.", meta: "Character Card", imageSrc: "/cards/tarsier_CARD.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 44, title: "Tarsier — Skill 1", description: "First skill card for the Tarsier character.", meta: "Skill Card", imageSrc: "/cards/skill_tarsier_1.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 45, title: "Tarsier — Skill 2", description: "Second skill card for the Tarsier character.", meta: "Skill Card", imageSrc: "/cards/skill_tarsier_2.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 46, title: "Tarsier — Ultimate", description: "Ultimate ability card for the Tarsier character.", meta: "Skill Card", imageSrc: "/cards/skill_tarsier_ultimate.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 2, title: "Carabao", description: "A powerful beast card depicting the iconic Filipino carabao with earthy tones and cultural symbolism.", meta: "Character Card", imageSrc: "/cards/carabao_CARD.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 41, title: "Carabao — Skill 1", description: "First skill card for the Carabao character.", meta: "Skill Card", imageSrc: "/cards/skill_carabao_1.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 42, title: "Carabao — Skill 2", description: "Second skill card for the Carabao character.", meta: "Skill Card", imageSrc: "/cards/skill_carabao_2.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 43, title: "Carabao — Ultimate", description: "Ultimate ability card for the Carabao character.", meta: "Skill Card", imageSrc: "/cards/skill_carabao_ultimate.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 1, title: "Whale Shark", description: "A majestic ocean creature card featuring a deep-sea whale with bioluminescent accents.", meta: "Character Card", imageSrc: "/cards/whale_CARD.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 47, title: "Whale — Swim", description: "First skill card for the Whale character. Co-designed with teammate — contributed background illustration and art direction.", meta: "Skill Card • Co-designed", imageSrc: "/cards/skill_whale_1.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 48, title: "Whale — Bubble Trap", description: "Second skill card for the Whale character. Co-designed with teammate — contributed background illustration and art direction.", meta: "Skill Card • Co-designed", imageSrc: "/cards/skill_whale_2.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 49, title: "Whale — Tidal Reversal", description: "Ultimate ability card for the Whale character. Co-designed with teammate — contributed background illustration and art direction.", meta: "Skill Card • Co-designed", imageSrc: "/cards/skill_whale_ultimate.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 3, title: "Eagle", description: "A legendary Philippine Eagle card with fierce detail and dynamic pose.", meta: "Character Card", imageSrc: "/cards/eagle_CARD.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 50, title: "Eagle — Dive Forward", description: "First skill card for the Eagle character. Co-designed with teammate — contributed background illustration and art direction.", meta: "Skill Card • Co-designed", imageSrc: "/cards/skill_eagle_1.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 51, title: "Eagle — Gust of Wind", description: "Second skill card for the Eagle character. Co-designed with teammate — contributed background illustration and art direction.", meta: "Skill Card • Co-designed", imageSrc: "/cards/skill_eagle_2.webp", category: "Game Cards", subgroup: "Character & Skills" },
  { id: 52, title: "Eagle — Sky Soar", description: "Ultimate ability card for the Eagle character. Co-designed with teammate — contributed background illustration and art direction.", meta: "Skill Card • Co-designed", imageSrc: "/cards/skill_eagle_ultimate.webp", category: "Game Cards", subgroup: "Character & Skills" },
  // Game Cards — Mythical
  { id: 5, title: "Manananggal", description: "A mythical creature card featuring the Filipino folklore Manananggal, designed for dark fantasy aesthetics.", meta: "Mythical Card", imageSrc: "/cards/mythical_1.webp", category: "Game Cards", subgroup: "Mythical" },
  { id: 6, title: "Aswang", description: "An eerie depiction of the Aswang from Philippine mythology, illustrated as a high-tier mythical card.", meta: "Mythical Card", imageSrc: "/cards/mythical_2.webp", category: "Game Cards", subgroup: "Mythical" },
  { id: 7, title: "Maligno", description: "A dark spirit card representing the Filipino concept of malevolent supernatural entities.", meta: "Mythical Card", imageSrc: "/cards/mythical_maligno.webp", category: "Game Cards", subgroup: "Mythical" },
  { id: 8, title: "Tikbalang", description: "A towering half-horse creature from Filipino folklore, illustrated with imposing presence.", meta: "Mythical Card", imageSrc: "/cards/mythical_tikbalang.webp", category: "Game Cards", subgroup: "Mythical" },
  { id: 9, title: "Sirena", description: "A mesmerizing sea creature card depicting the Filipino mermaid with enchanting beauty.", meta: "Mythical Card", imageSrc: "/cards/mythical_sirena.webp", category: "Game Cards", subgroup: "Mythical" },
  // Game Cards — Rare
  { id: 10, title: "Mount Uwe", description: "A rare volcanic entity card featuring explosive lava effects and dramatic lighting.", meta: "Rare Card", imageSrc: "/cards/rare_1.webp", category: "Game Cards", subgroup: "Rare" },
  { id: 11, title: "Kulam", description: "A dark magic spell card with mystical hand gestures and glowing energy orbs.", meta: "Rare Card", imageSrc: "/cards/rare_2.webp", category: "Game Cards", subgroup: "Rare" },
  { id: 12, title: "Bagyo", description: "A devastating storm card capturing the raw power of a Philippine typhoon.", meta: "Rare Card", imageSrc: "/cards/rare_bagyo.webp", category: "Game Cards", subgroup: "Rare" },
  { id: 13, title: "Fly High Pasakay", description: "A rare transport card allowing players to soar across the board.", meta: "Rare Card", imageSrc: "/cards/rare_fly_high_pasakay.webp", category: "Game Cards", subgroup: "Rare" },
  { id: 14, title: "Sa Kanto Lang Po", description: "A rare movement card with street-level Filipino urban culture aesthetics.", meta: "Rare Card", imageSrc: "/cards/rare_sa_kanto_lang_po.webp", category: "Game Cards", subgroup: "Rare" },
  // Game Cards — Common
  { id: 15, title: "Tumbang Person", description: "A common action card depicting a classic Filipino street game mechanic.", meta: "Common Card", imageSrc: "/cards/common_tumbang_person.webp", category: "Game Cards", subgroup: "Common" },
  { id: 16, title: "Anting-Anting", description: "A protective amulet card inspired by Filipino folk beliefs in mystical charms.", meta: "Common Card", imageSrc: "/cards/common_anting_anting.webp", category: "Game Cards", subgroup: "Common" },
  { id: 17, title: "Balikbayan Box", description: "A supply card representing the iconic Filipino care package from overseas.", meta: "Common Card", imageSrc: "/cards/common_balikbayan_box.webp", category: "Game Cards", subgroup: "Common" },
  { id: 18, title: "Buwaya", description: "A common creature card featuring the Filipino crocodile with snapping jaws.", meta: "Common Card", imageSrc: "/cards/common_buwaya.webp", category: "Game Cards", subgroup: "Common" },
  { id: 40, title: "Lechon", description: "A common card featuring the iconic Filipino roasted pig, a symbol of celebration and feasts.", meta: "Common Card", imageSrc: "/cards/common_lechon.webp", category: "Game Cards", subgroup: "Common" },
  // Game Cards — Mystery
  { id: 19, title: "3 Spaces Forward", description: "An advantage mystery card that moves the player forward.", meta: "Mystery • Advantage", imageSrc: "/cards/mystery_advantage_3_spaces_forward.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 20, title: "Get Common Card", description: "An advantage mystery card that grants a free common card.", meta: "Mystery • Advantage", imageSrc: "/cards/mystery_advantage_get_common.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 21, title: "Get Rare Card", description: "An advantage mystery card that grants a free rare card.", meta: "Mystery • Advantage", imageSrc: "/cards/mystery_advantage_get_rare.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 22, title: "+1 Card", description: "An advantage mystery card that gives an extra card draw.", meta: "Mystery • Advantage", imageSrc: "/cards/mystery_advantage_plus1.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 23, title: "3 Spaces Back", description: "A disadvantage mystery card that moves the player backward.", meta: "Mystery • Disadvantage", imageSrc: "/cards/mystery_disadvantage_3_spaces_back.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 24, title: "Can't Use Powerup", description: "A disadvantage mystery card that blocks powerup usage for a turn.", meta: "Mystery • Disadvantage", imageSrc: "/cards/mystery_disadvantage_cant_use_powerup.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 25, title: "Lose Powerup", description: "A disadvantage mystery card that removes a held powerup.", meta: "Mystery • Disadvantage", imageSrc: "/cards/mystery_disadvantage_lose_powerup.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 26, title: "-1 Card", description: "A disadvantage mystery card that forces discarding a card.", meta: "Mystery • Disadvantage", imageSrc: "/cards/mystery_disadvantage_minus1.webp", category: "Game Cards", subgroup: "Mystery" },
  { id: 9, title: "Gora Na Explorer", description: "A brand identity for Gora Na Explorer, combining adventure-inspired typography with nature-themed visual elements.", meta: "Logo Design", imageSrc: "/logos/LOGO_gora_na_explorer.webp", category: "Logos" },
  { id: 10, title: "MathPulse AI", description: "A modern tech logo for MathPulse AI, featuring geometric precision and vibrant gradients that convey intelligence and innovation.", meta: "Logo Design", imageSrc: "/logos/LOGO_mathpulse_ai.webp", category: "Logos" },
  { id: 38, title: "Friize", description: "A playful and refreshing logo for the Friize beverage brand, capturing the essence of fruity frozen drinks.", meta: "Logo Design", imageSrc: "/logo_friize.png", category: "Logos" },
  { id: 39, title: "Xandata Studios", description: "A bold logo for Xandata Studios, combining sharp geometry with a modern gaming aesthetic.", meta: "Logo Design", imageSrc: "/logo_xandata_studios.png", category: "Logos" },
  { id: 11, title: "Gora Na Explorer Map", description: "A hand-illustrated exploration map for the Gora Na Explorer project, featuring detailed terrain, trails, and points of interest.", meta: "Game Map", imageSrc: "/maps/MAP_gora_na_explorer.webp", category: "Maps" },
  { id: 12, title: "Pixel Map — Gora Na Explorer", description: "A pixel art rendition of the Gora Na Explorer map, reimagined in a retro game style.", meta: "Pixel Map", imageSrc: "/map_pixel_gora_na_explorer.webp", category: "Maps" },
  { id: 13, title: "Burger Poster", description: "A bold promotional poster for a burger brand with dynamic composition and appetizing visuals.", meta: "Poster Design", imageSrc: "/poster_burger.webp", category: "Posters" },
  { id: 14, title: "Coffee Poster", description: "A warm-toned poster design for a coffee brand, blending cozy aesthetics with modern typography.", meta: "Poster Design", imageSrc: "/poster_coffee.webp", category: "Posters" },
  { id: 15, title: "Artist Profile Poster", description: "A self-promotional poster showcasing artistic identity with creative layout and visual storytelling.", meta: "Poster Design", imageSrc: "/poster_artist_profile.webp", category: "Posters" },
  { id: 16, title: "Women's Day Poster", description: "A celebratory poster design honoring women with empowering visuals and vibrant colors.", meta: "Poster Design", imageSrc: "/poster_women.webp", category: "Posters" },
  { id: 17, title: "Gora Na Explorer Banner", description: "A promotional banner for the Gora Na Explorer project featuring adventure-themed visuals.", meta: "Banner Design", imageSrc: "/gora_na_explorer_banner.webp", category: "Posters" },
  { id: 18, title: "Animation — Storyboard Assets", description: "Produced the storyboard and visual assets for this animated short. Storyboarding and asset creation by Art of Rain.", meta: "Animation Assets", imageSrc: "", videoSrc: "https://www.youtube.com/embed/i5E9uWphUD8?autoplay=1&mute=1&modestbranding=1&rel=0", category: "Motion & Story" },
  { id: 19, title: "Storyboard — Page 1", description: "Opening scene of an original storyboard sequence.", meta: "Storyboard", imageSrc: "/storyboard_1.webp", category: "Motion & Story" },
  { id: 20, title: "Storyboard — Page 2", description: "Character introduction and scene setup.", meta: "Storyboard", imageSrc: "/storyboard_2.webp", category: "Motion & Story" },
  { id: 21, title: "Storyboard — Page 3", description: "Rising action and conflict development.", meta: "Storyboard", imageSrc: "/storyboard_3.webp", category: "Motion & Story" },
  { id: 22, title: "Storyboard — Page 4", description: "Dramatic turning point in the narrative.", meta: "Storyboard", imageSrc: "/storyboard_4.webp", category: "Motion & Story" },
  { id: 23, title: "Storyboard — Page 5", description: "Climactic sequence with dynamic framing.", meta: "Storyboard", imageSrc: "/storyboard_5.webp", category: "Motion & Story" },
  { id: 24, title: "Storyboard — Page 6", description: "Resolution and emotional payoff.", meta: "Storyboard", imageSrc: "/storyboard_6.webp", category: "Motion & Story" },
  { id: 25, title: "Storyboard — Page 7", description: "Epilogue scene with closing visuals.", meta: "Storyboard", imageSrc: "/storyboard_7.webp", category: "Motion & Story" },
  { id: 26, title: "Storyboard — Page 8", description: "Extended narrative continuation.", meta: "Storyboard", imageSrc: "/storyboard_8.webp", category: "Motion & Story" },
  { id: 27, title: "Storyboard — Page 9", description: "Character development sequence.", meta: "Storyboard", imageSrc: "/storyboard_9.webp", category: "Motion & Story" },
  { id: 28, title: "Storyboard — Page 10", description: "Action sequence with dynamic panels.", meta: "Storyboard", imageSrc: "/storyboard_10.webp", category: "Motion & Story" },
  { id: 29, title: "Storyboard — Page 11", description: "Emotional climax of the story.", meta: "Storyboard", imageSrc: "/storyboard_11.webp", category: "Motion & Story" },
  { id: 30, title: "Storyboard — Page 12", description: "Final page — story conclusion.", meta: "Storyboard", imageSrc: "/storyboard_12.webp", category: "Motion & Story" },
  { id: 31, title: "Bayanihan Comic", description: "A comic-style illustration depicting the Filipino spirit of Bayanihan — community and togetherness.", meta: "Comic Art", imageSrc: "/bayanihan_comic.webp", category: "Motion & Story" },
  { id: 31, title: "Crafted by Print Habit — Moodboard", description: "A visual moodboard defining the brand direction for Crafted by Print Habit's souvenir business.", meta: "Moodboard", imageSrc: "/moodboard_crafted_by.webp", category: "Concept Design" },
  { id: 32, title: "Art of Rain — Moodboard", description: "An early moodboard exploring the visual identity and aesthetic direction for the Art of Rain brand.", meta: "Moodboard", imageSrc: "/moodboard_old_ver_art_of_rain.png", category: "Concept Design" },
  { id: 33, title: "Friize — Grape", description: "Grape flavor variant of the Friize product line, featuring vibrant purple tones and fresh fruit imagery.", meta: "Product Design", imageSrc: "/grape_friize.webp", category: "Concept Design" },
  { id: 34, title: "Friize — Lemon", description: "Lemon flavor variant with zesty yellow accents and citrus-inspired design elements.", meta: "Product Design", imageSrc: "/lemon_friize.webp", category: "Concept Design" },
  { id: 35, title: "Friize — Lime", description: "Lime flavor variant featuring cool green tones and refreshing visual language.", meta: "Product Design", imageSrc: "/lime_friize.webp", category: "Concept Design" },
  { id: 36, title: "Friize — Orange", description: "Orange flavor variant with warm citrus colors and energetic design.", meta: "Product Design", imageSrc: "/orange_friize.webp", category: "Concept Design" },
  { id: 37, title: "Friize — Product Mockup", description: "A complete product mockup showcasing all four Friize flavor variants together in a realistic presentation.", meta: "Product Mockup", imageSrc: "/product_mockup.webp", category: "Concept Design" },
  { id: 53, title: "Chroma Ignite — App Wireframe", description: "A UI wireframe for Chroma Ignite, a social platform designed for artists to grow their community, share creativity, find inspiration, and connect with creators worldwide.", meta: "App Wireframe", imageSrc: "/wireframe_art_app.webp", category: "Concept Design" },
];

const CATEGORIES_ORDER = ["All", "Game Cards", "Logos", "Maps", "Posters", "Motion & Story", "Concept Design"];

const CATEGORY_INFO: Record<string, { description: string; image: string }> = {
  "Game Cards": { description: "Mythical creatures, rare beasts, and legendary beings — illustrated for immersive tabletop card games.", image: "/game_cards.png" },
  "Logos": { description: "Brand identities crafted with bold typography and clean geometry for startups and creative projects.", image: "/logo_designs.png" },
  "Maps": { description: "Hand-illustrated exploration maps with detailed terrain, trails, and points of interest.", image: "/game_map.png" },
  "Posters": { description: "Vibrant promotional designs blending illustration with bold typography.", image: "/posters.png" },
  "Motion & Story": { description: "Storyboards, comics, and animation — visual narratives brought to life frame by frame.", image: "/motion_story.png" },
  "Concept Design": { description: "Moodboards, product designs, and visual explorations that shape creative direction.", image: "/concept_design.png" },
};

export function WorksPage() {
  const [view, setView] = useState<"grid" | "detail">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showTraditional, setShowTraditional] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background text-foreground px-4 py-10 relative">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage: "linear-gradient(to right, oklch(0.985 0 0 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.985 0 0 / 0.06) 1px, transparent 1px)",
          }}
        />
        {/* Primary radial glow — top left */}
        <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.25)_0%,transparent_70%)]" />
        {/* Secondary radial glow — bottom right */}
        <div className="absolute -bottom-[15%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.1_250/0.2)_0%,transparent_70%)]" />
        {/* Accent glow — center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.12)_0%,transparent_60%)]" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        {/* Floating shapes */}
        <div className="absolute top-[15%] right-[20%] w-32 h-32 border border-white/[0.07] rounded-full" />
        <div className="absolute bottom-[25%] left-[15%] w-20 h-20 border border-white/[0.05] rotate-45" />
        <div className="absolute top-[60%] right-[10%] w-3 h-3 bg-primary/30 rounded-full" />
        <div className="absolute top-[30%] left-[8%] w-2 h-2 bg-secondary/30 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="pb-4">
          {/* Top bar: back button + filter + view toggle in one row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => showTraditional ? setShowTraditional(false) : view === "detail" ? setView("grid") : navigate(-1)}
              className="p-2 rounded-full bg-muted/50 border border-border/50 hover:bg-muted transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              {/* Traditional art toggle */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  animate={!showTraditional ? { boxShadow: ["0 0 0px rgba(120,80,200,0)", "0 0 15px rgba(120,80,200,0.6)", "0 0 0px rgba(120,80,200,0)"] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  onClick={() => setShowTraditional(!showTraditional)}
                  className={`w-10 h-10 rounded-full cursor-pointer ${showTraditional ? "shadow-[0_0_12px_rgba(120,80,200,0.4)]" : ""}`}
                >
                  <img src="/web_logo.png" alt="" className="w-10 h-10 rounded-full" />
                </motion.button>
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: 5 }}
                  transition={{ delay: 3, duration: 0.4 }}
                  className="absolute right-0 top-full mt-2 pointer-events-none z-30 group-hover:!opacity-100 group-hover:!translate-y-0 transition-all duration-200"
                >
                  <div className="bg-white text-black text-xs font-bold px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
                    {showTraditional ? "Back to Digital Works!" : "Wanna see my traditional artworks too? Click me!"}
                  </div>
                </motion.div>
              </div>

              {/* Filter dropdown */}
              <div className={`relative ${showTraditional ? "hidden" : ""}`}>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-sm font-semibold cursor-pointer hover:bg-white/10 hover:border-white/25 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
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
              <div className={`flex items-center gap-1 rounded-full bg-white/5 p-1 border border-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.2)] ${showTraditional ? "hidden" : ""}`}>
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

          {/* Centered title — dynamic in detail view */}
          {!showTraditional && <div className="text-center mb-4">
            {view === "detail" && activeCategory !== "All" && CATEGORY_INFO[activeCategory] ? (
              <>
                <img src={CATEGORY_INFO[activeCategory].image} alt={activeCategory} className="h-12 md:h-16 object-contain mx-auto -rotate-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-lg mx-auto">{CATEGORY_INFO[activeCategory].description}</p>
              </>
            ) : view === "detail" && activeCategory === "All" ? (
              <>
                <img src={CATEGORY_INFO[filtered[selectedIndex]?.category]?.image || "/creative_works.png"} alt="" className="h-12 md:h-16 object-contain mx-auto -rotate-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-lg mx-auto">{CATEGORY_INFO[filtered[selectedIndex]?.category]?.description || "Full collection of illustrations, designs, and visual projects."}</p>
              </>
            ) : (
              <>
                <img src="/creative_works.png" alt="Creative Works" className="h-16 md:h-24 object-contain mx-auto -rotate-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-lg mx-auto">Full collection of illustrations, designs, and visual projects.</p>
              </>
            )}
          </div>}
        </div>
        {/* Views */}
        {showTraditional ? (
          <div>
            <div className="text-center mb-6">
              <img src="/traditional_art.png" alt="Traditional Art" className="h-12 md:h-16 object-contain mx-auto -rotate-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
              <p className="text-muted-foreground text-sm mt-2">Pencil, ink, and paint — artworks created by hand.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { src: "/traditional_art_header.webp", title: "Traditional Portrait" },
                { src: "/traditional_1.webp", title: "Artwork 1" },
                { src: "/traditional_2.webp", title: "Artwork 2" },
                { src: "/traditional_3.webp", title: "Artwork 3" },
                { src: "/traditional_4.webp", title: "Artwork 4" },
                { src: "/traditional_5.webp", title: "Artwork 5" },
                { src: "/traditional_6.webp", title: "Artwork 6" },
                { src: "/traditional_7.webp", title: "Artwork 7" },
                { src: "/traditional_8.webp", title: "Artwork 8" },
                { src: "/traditional_9.webp", title: "Artwork 9" },
                { src: "/traditional_eyes.webp", title: "Eyes Study" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }} className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-[0_0_40px_-5px_rgba(120,80,200,0.3)] transition-shadow">
                  <img src={item.src} alt={item.title} className="w-full h-auto object-cover rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white font-bold text-sm">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
        view === "grid" ? (
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
                      {(() => {
                        const subgroups = [...new Set(items.map(i => i.subgroup).filter(Boolean))];
                        if (subgroups.length > 0) {
                          return subgroups.map(sg => {
                            const sgItems = items.filter(i => i.subgroup === sg);
                            return (
                              <div key={sg} className="mb-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{sg}</p>
                                <div className={`gap-3 md:gap-4 grid grid-cols-2 sm:grid-cols-3 ${sg === "Character & Skills" ? "md:grid-cols-4" : sgItems.length <= 4 ? "md:grid-cols-4" : "md:grid-cols-5"}`}>
                                  {sgItems.map((item) => {
                                    const globalIndex = filtered.findIndex(f => f.id === item.id);
                                    return (
                                      <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} onClick={() => handleGridClick(globalIndex)} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"; }} className="group relative rounded-xl overflow-hidden cursor-pointer transition-[box-shadow] duration-300 hover:shadow-[0_0_40px_-5px_rgba(120,80,200,0.3)]" style={{ transition: "transform 0.2s ease-out, box-shadow 0.3s ease" }}>
                                        <img src={item.imageSrc} alt={item.title} className="w-full h-auto object-cover rounded-xl" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"><div><p className="text-white font-bold text-sm">{item.title}</p><p className="text-white/60 text-xs">{item.meta}</p></div></div>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          });
                        }
                        return (
                          <div className={`gap-3 md:gap-4 ${items.length <= 2 ? "grid grid-cols-2" : items.length <= 4 ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"}`}>
                            {items.map((item) => {
                              const globalIndex = filtered.findIndex(f => f.id === item.id);
                              return (
                                <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} onClick={() => handleGridClick(globalIndex)} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"; }} className="group relative rounded-xl overflow-hidden cursor-pointer transition-[box-shadow] duration-300 hover:shadow-[0_0_40px_-5px_rgba(120,80,200,0.3)]" style={{ transition: "transform 0.2s ease-out, box-shadow 0.3s ease" }}>
                                  {item.videoSrc ? (
                                    <div className="w-full aspect-video rounded-xl overflow-hidden"><iframe src={item.videoSrc} className="w-full h-full" allowFullScreen /></div>
                                  ) : (
                                    <img src={item.imageSrc} alt={item.title} className="w-full h-auto object-cover rounded-xl" />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"><div><p className="text-white font-bold text-sm">{item.title}</p><p className="text-white/60 text-xs">{item.meta}</p></div></div>
                                </motion.div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {filtered.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} onClick={() => handleGridClick(index)} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"; }} className="group relative rounded-xl overflow-hidden cursor-pointer transition-[box-shadow] duration-300 hover:shadow-[0_0_40px_-5px_rgba(120,80,200,0.3)] mb-3 md:mb-4" style={{ transition: "transform 0.2s ease-out, box-shadow 0.3s ease" }}>
                    {item.videoSrc ? (
                      <div className="w-full aspect-video rounded-xl overflow-hidden"><iframe src={item.videoSrc} className="w-full h-full" allowFullScreen /></div>
                    ) : (
                      <img src={item.imageSrc} alt={item.title} className="w-full h-auto object-cover rounded-xl" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"><div><p className="text-white font-bold text-sm">{item.title}</p><p className="text-white/60 text-xs">{item.meta}</p></div></div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <FocusRail items={filtered} initialIndex={selectedIndex} onActiveChange={setSelectedIndex} />
        ))}
      </div>
      <BackToTop />
    </div>
  );
}
