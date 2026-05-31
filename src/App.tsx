import { useState, useCallback, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { BackToTop } from "@/components/ui/back-to-top";
import { ScrollLogo } from "@/components/ui/scroll-logo";
import { SlideTabsNavbar } from "@/components/ui/slide-tabs-navbar";
import { FeaturedProjects } from "@/components/ui/feature-projects";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { IntroAnimation } from "@/components/ui/intro-animation";
import { WorksPreview } from "@/components/ui/works-preview";
import { WorksPage } from "@/pages/works";

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.sendForm("service_qx2lv2g", "template_m7x5axk", formRef.current!, "wpvnngz6B2O97-J5l")
      .then(() => { setStatus("sent"); formRef.current?.reset(); })
      .catch(() => setStatus("error"));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="text-left space-y-4 flex flex-col h-full">
      <input name="from_name" required placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" />
      <input name="from_email" type="email" required placeholder="Your email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" />
      <textarea name="message" required rows={4} placeholder="Your message" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none flex-1" />
      <button type="submit" disabled={status === "sending"} className="w-full py-3 rounded-full bg-foreground text-background font-bold text-sm hover:bg-foreground/90 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] disabled:opacity-50 cursor-pointer">
        {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent! ✓" : status === "error" ? "Failed — Try Again" : "Send Message"}
      </button>
    </form>
  );
}

function TypewriterText({ text }: { text: string }) {
  return (
    <motion.p className="text-foreground/60 text-sm leading-relaxed">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.02, duration: 0 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <BrowserRouter>
      {/* Intro only plays once, lives outside Routes */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      <Routes>
        <Route path="/" element={
          <div className="relative w-full bg-background min-h-screen font-sans overflow-x-hidden">
            <SlideTabsNavbar />
            <ScrollLogo />
            <BackToTop />

            <section id="home" className="scroll-mt-0">
              <CinematicFooter />
            </section>

            <section id="projects" className="relative bg-background scroll-mt-0">
              <FeaturedProjects />
            </section>

            <section id="works" className="relative scroll-mt-0">
              <WorksPreview />
            </section>

            <section id="about" className="relative scroll-mt-0 py-12 md:py-24 px-4 overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-70" style={{ backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, oklch(0.985 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.985 0 0 / 0.05) 1px, transparent 1px)", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }} />
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.1_250/0.15)_0%,transparent_70%)]" />
              </div>

              <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {/* Left: Header + Bio + Current Quest */}
                  <div>
                    <img src="/about_me.png" alt="About Me" className="h-8 md:h-10 object-contain mb-4 -rotate-1 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer" />
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] uppercase tracking-tight text-foreground mb-8">
                      Creative<br />Designer
                    </h2>
                    <p className="text-foreground/70 text-base leading-relaxed mb-4">
                      I'm an <span className="text-primary font-semibold">IT student</span> drawn to the <span className="text-primary font-semibold">creative side</span> of technology. I love exploring digital illustration, user interface design, and character concept art. For me, the most exciting part of any project is figuring out the visuals, the mood, and the storytelling elements that <span className="text-primary font-semibold">make an experience feel alive</span>.
                    </p>
                    <p className="text-foreground/50 text-sm leading-relaxed mb-6 pl-4 border-l-2 border-primary/30">
                      While design is my focus, I also build responsive web interfaces with React and Tailwind CSS. Knowing code lets me bring my own designs straight to the screen.
                    </p>
                    {/* Current Quest speech bubble */}
                    <div className="flex items-start gap-3 mt-4">
                      <motion.img
                        src="/web_logo.png"
                        alt=""
                        className="w-12 h-12 rounded-full shrink-0"
                        animate={{ y: [0, -4, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 shadow-[0_0_20px_-5px_rgba(120,80,200,0.15)]">
                        <div className="absolute left-[-8px] top-5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-white/10" />
                        <TypewriterText text="I am actively seeking OJT internship opportunities where I can learn, grow, and contribute my skills in UI/UX design, visual asset creation, or frontend layouts." />
                      </div>
                    </div>
                  </div>

                  {/* Right: Tools — Bento grid */}
                  <div className="flex flex-col gap-3 h-full">
                    {/* Creative Suite — icons */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex-1 flex flex-col">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4">Creative Suite</h3>
                      <div className="grid grid-cols-3 gap-3 flex-1 place-items-center">
                        {[
                          { name: "Figma", icon: "/figma_icon.png" },
                          { name: "Krita", icon: "/krita_icon.png" },
                          { name: "IbisPaint", icon: "/ibis_paint_icon.png" },
                          { name: "Canva", icon: "/canva_icon.png" },
                          { name: "Photoshop", icon: "/photoshop_icon.png" },
                          { name: "Illustrator", icon: "/illustrator_icon.png" },
                        ].map((tool, i) => (
                          <div key={tool.name} className="group flex flex-col items-center cursor-pointer" style={{ transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)", animation: `float ${3 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite` }} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left - rect.width / 2) * 0.4; const y = (e.clientY - rect.top - rect.height / 2) * 0.4; e.currentTarget.style.transform = `translate(${x}px, ${y}px) scale(1.15)`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}>
                            <img src={tool.icon} alt={tool.name} className="w-14 h-14 md:w-20 md:h-20 object-contain group-hover:drop-shadow-[0_0_12px_rgba(120,80,200,0.6)] transition-all duration-300" />
                            <span className="text-[11px] text-muted-foreground mt-1">{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom row: Dev Stack + Collaboration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Dev Stack</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {["React", "Tailwind", "TypeScript", "HTML5", "CSS3", "JavaScript", "Vite"].map((tool) => (
                            <span key={tool} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-foreground/70 hover:bg-primary/20 hover:border-primary/40 hover:text-foreground cursor-pointer transition-all duration-200">{tool}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Collaboration</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {["GitHub", "Firebase", "Jira"].map((tool) => (
                            <span key={tool} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-foreground/70 hover:bg-primary/20 hover:border-primary/40 hover:text-foreground cursor-pointer transition-all duration-200">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="relative scroll-mt-0 py-12 md:py-24 px-4 overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-70" style={{ backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, oklch(0.985 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.985 0 0 / 0.05) 1px, transparent 1px)", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }} />
                <div className="absolute -top-[15%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.1_250/0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-[20%] -right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.15)_0%,transparent_70%)]" />
              </div>

              <div className="max-w-4xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-10 items-stretch">
                  {/* Left: Text */}
                  <div className="text-left">
                    <img src="/contact_me.png" alt="Contact Me" className="h-8 md:h-10 object-contain mb-4 -rotate-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] uppercase tracking-tight text-foreground mb-6">
                      Let's Work<br />Together
                    </h2>
                    <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                      Have a project in mind or looking for a creative intern? I'd love to hear from you.
                    </p>
                    <div className="flex items-center gap-6">
                      {[{ name: "GitHub", url: "https://github.com/raineer26" }, { name: "LinkedIn", url: "https://linkedin.com/" }, { name: "Resume", url: "/Rosado_Resume.pdf" }].map((platform) => (
                        <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/40 hover:text-foreground transition-colors" title={platform.name === "LinkedIn" ? "LinkedIn profile coming soon!" : undefined}>
                          {platform.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right: Form */}
                  <ContactForm />
                </div>
                <p className="mt-16 text-center text-foreground/30 text-xs uppercase tracking-widest">© 2026 Art of Rain. All rights reserved.</p>
              </div>
            </section>
          </div>
        } />
        <Route path="/works" element={<WorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
