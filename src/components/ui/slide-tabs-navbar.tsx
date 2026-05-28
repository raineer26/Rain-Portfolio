import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", target: "home" },
  { label: "Projects", target: "projects" },
  { label: "Creative", target: "works" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

export function SlideTabsNavbar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);
  const isScrolling = useRef(false);

  const updateCursor = useCallback((index: number) => {
    const tab = tabsRef.current[index];
    if (tab) {
      const { width } = tab.getBoundingClientRect();
      setPosition({ left: tab.offsetLeft, width, opacity: 1 });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;
      const scrollY = window.scrollY + window.innerHeight / 3;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].target);
        if (el && el.offsetTop <= scrollY) {
          if (selected !== i) {
            setSelected(i);
            updateCursor(i);
          }
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selected, updateCursor]);

  useEffect(() => {
    updateCursor(selected);
  }, [selected, updateCursor]);

  const scrollTo = (index: number) => {
    isScrolling.current = true;
    setSelected(index);
    updateCursor(index);
    setMenuOpen(false);
    document.getElementById(NAV_ITEMS[index].target)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { isScrolling.current = false; }, 1000);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <ul
          onMouseLeave={() => updateCursor(selected)}
          className="relative flex w-fit rounded-full border border-white/10 bg-white/5 backdrop-blur-xl p-1.5 shadow-lg shadow-black/20"
        >
          {NAV_ITEMS.map((item, i) => (
            <Tab
              key={item.target}
              ref={(el) => { tabsRef.current[i] = el; }}
              setPosition={setPosition}
              onClick={() => scrollTo(i)}
            >
              {item.label}
            </Tab>
          ))}
          <Cursor position={position} />
        </ul>
      </nav>

      {/* Mobile hamburger button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.target}
                initial={{ opacity: 0, y: 80, rotate: 10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.65, 0.01, 0.05, 0.99] }}
                onClick={() => scrollTo(i)}
                className={`cursor-pointer ${selected === i ? "text-white" : "text-white/50"}`}
              >
                <motion.span
                  initial="initial"
                  whileHover="hovered"
                  className="relative block overflow-hidden"
                  style={{ lineHeight: 0.85 }}
                >
                  <div>
                    {item.label.split("").map((l, idx) => (
                      <motion.span
                        key={idx}
                        variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
                        transition={{ ease: "easeInOut", delay: 0.035 * idx }}
                        className="inline-block text-3xl font-black uppercase tracking-wider"
                      >
                        {l}
                      </motion.span>
                    ))}
                  </div>
                  <div className="absolute inset-0">
                    {item.label.split("").map((l, idx) => (
                      <motion.span
                        key={idx}
                        variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
                        transition={{ ease: "easeInOut", delay: 0.035 * idx }}
                        className="inline-block text-3xl font-black uppercase tracking-wider"
                      >
                        {l}
                      </motion.span>
                    ))}
                  </div>
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface TabProps {
  children: React.ReactNode;
  setPosition: (pos: { left: number; width: number; opacity: number }) => void;
  onClick: () => void;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick }, ref) => {
    return (
      <motion.li
        ref={ref}
        onClick={onClick}
        whileTap={{ scale: 0.92 }}
        onMouseEnter={() => {
          const el = ref as React.RefObject<HTMLLIElement>;
          if (!el?.current) return;
          const { width } = el.current.getBoundingClientRect();
          setPosition({ left: el.current.offsetLeft, width, opacity: 1 });
        }}
        className="relative z-10 block cursor-pointer px-4 py-2 text-xs uppercase text-white mix-blend-difference md:px-6 md:py-2.5 md:text-sm font-medium tracking-wider"
      >
        {children}
      </motion.li>
    );
  }
);
Tab.displayName = "Tab";

function Cursor({ position }: { position: { left: number; width: number; opacity: number } }) {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 top-1.5 h-8 md:h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
    />
  );
}
