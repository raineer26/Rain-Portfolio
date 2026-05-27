import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollLogo() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 3000], [0, -360]);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ rotate }}
      whileHover={{ scale: 1.15, filter: "brightness(1.3) drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-5 left-5 z-50 w-8 md:w-10 cursor-pointer"
    >
      <img src="/rain_logo.png" alt="Art of Rain — Home" className="w-full h-full rounded-full" />
    </motion.button>
  );
}
