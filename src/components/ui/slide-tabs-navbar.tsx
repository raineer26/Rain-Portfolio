import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", target: "home" },
  { label: "Projects", target: "projects" },
  { label: "Works", target: "works" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

const TAB_COLORS = ["#E8A0BF", "#B5DECE", "#C9B8E8", "#FFE5A0", "#F4A89A"];

export function SlideTabsNavbar() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;
      const scrollY = window.scrollY + window.innerHeight / 3;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].target);
        if (el && el.offsetTop <= scrollY) {
          if (selected !== i) setSelected(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selected]);

  const scrollTo = (index: number) => {
    isScrolling.current = true;
    setSelected(index);
    setMenuOpen(false);
    document.getElementById(NAV_ITEMS[index].target)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { isScrolling.current = false; }, 1000);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="relative flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-sm border-2 border-border p-1.5 shadow-[0_4px_20px_rgba(61,44,30,0.08)]">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.target}
              onClick={() => scrollTo(i)}
              className="relative px-5 py-2 rounded-full text-sm font-bold cursor-pointer z-10 transition-colors"
            >
              {selected === i && (
                <motion.span
                  layoutId="nav-marker"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: TAB_COLORS[i], opacity: 0.4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${selected === i ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border-2 border-border flex items-center justify-center text-foreground cursor-pointer shadow-md"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-cream/95 backdrop-blur-md flex flex-col items-center justify-center gap-6"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border-2 border-border flex items-center justify-center text-foreground cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.target}
                initial={{ opacity: 0, y: 30, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.65, 0.01, 0.05, 0.99] }}
                onClick={() => scrollTo(i)}
                className="relative text-4xl font-black uppercase tracking-wide cursor-pointer font-hand px-6 py-2 rounded-xl"
                style={{ color: selected === i ? TAB_COLORS[i] : "#8B7355" }}
              >
                {item.label}
                {selected === i && (
                  <span className="absolute bottom-0 left-2 right-2 h-3 rounded-sm -z-10" style={{ backgroundColor: TAB_COLORS[i], opacity: 0.3 }} />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
