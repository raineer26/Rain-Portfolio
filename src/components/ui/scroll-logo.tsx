import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const BUBBLE_MESSAGES = [
  { section: "home", text: "Have fun exploring my portfolio! ◝(ᵔᗜᵔ)◜" },
  { section: "projects", text: "Check out what I've built! ٩(ˊᗜˋ*)و" },
  { section: "works", text: "My favorite artworks are here! (ノ´ヮ`)ノ*: ・゚✧" },
  { section: "about", text: "Get to know me! (´• ω •`)" },
  { section: "contact", text: "Click me to go back up! ٩(^ᗜ^ )و ´-" },
];

export function ScrollLogo() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 10000], [0, -1200]);
  const [hovered, setHovered] = useState(false);
  const [message, setMessage] = useState(BUBBLE_MESSAGES[0].text);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = BUBBLE_MESSAGES.length - 1; i >= 0; i--) {
        const el = document.getElementById(BUBBLE_MESSAGES[i].section);
        if (el && el.offsetTop <= scrollPos) {
          setMessage(BUBBLE_MESSAGES[i].text);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-5 left-5 z-50">
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ rotate }}
        whileHover={{ scale: 1.15, filter: "brightness(1.3) drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-12 md:w-14 cursor-pointer"
      >
        <img src="/web_logo.png" alt="Art of Rain — Home" className="w-full h-full rounded-full" />
      </motion.button>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -5 }}
        animate={hovered ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -5 }}
        transition={{ duration: 0.2 }}
        className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+8px)] pointer-events-none"
      >
        <div className="relative bg-white text-black text-xs font-bold px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
          {message}
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-white" />
        </div>
      </motion.div>
    </div>
  );
}
