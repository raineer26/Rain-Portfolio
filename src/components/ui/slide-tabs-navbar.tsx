import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", target: "home" },
  { label: "Projects", target: "projects" },
  { label: "Works", target: "works" },
];

export function SlideTabsNavbar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);
  const isScrolling = useRef(false);

  const updateCursor = useCallback((index: number) => {
    const tab = tabsRef.current[index];
    if (tab) {
      const { width } = tab.getBoundingClientRect();
      setPosition({ left: tab.offsetLeft, width, opacity: 1 });
    }
  }, []);

  // Scroll-spy: detect which section is in view
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

  // Update cursor on mount and when selected changes
  useEffect(() => {
    updateCursor(selected);
  }, [selected, updateCursor]);

  const scrollTo = (index: number) => {
    isScrolling.current = true;
    setSelected(index);
    updateCursor(index);
    document.getElementById(NAV_ITEMS[index].target)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { isScrolling.current = false; }, 1000);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
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
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => {
          const el = ref as React.RefObject<HTMLLIElement>;
          if (!el?.current) return;
          const { width } = el.current.getBoundingClientRect();
          setPosition({ left: el.current.offsetLeft, width, opacity: 1 });
        }}
        className="relative z-10 block cursor-pointer px-4 py-2 text-xs uppercase text-white mix-blend-difference md:px-6 md:py-2.5 md:text-sm font-medium tracking-wider"
      >
        {children}
      </li>
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
