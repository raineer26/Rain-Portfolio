import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackToTop } from "@/components/ui/back-to-top";
import { ScrollLogo } from "@/components/ui/scroll-logo";
import { SlideTabsNavbar } from "@/components/ui/slide-tabs-navbar";
import { FeaturedProjects } from "@/components/ui/feature-projects";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { IntroAnimation } from "@/components/ui/intro-animation";
import { WorksPreview } from "@/components/ui/works-preview";
import { WorksPage } from "@/pages/works";

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

            <section id="about" className="relative scroll-mt-0 py-20 md:py-32 px-4 overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-70" style={{ backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, oklch(0.985 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.985 0 0 / 0.05) 1px, transparent 1px)", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }} />
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.1_250/0.15)_0%,transparent_70%)]" />
              </div>

              <div className="max-w-5xl mx-auto relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">About Me</p>
                <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] uppercase tracking-tight text-foreground mb-8">
                  Creative<br />Developer
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                      I'm a passionate designer and developer who blends digital illustration with modern web development. I create immersive experiences that tell stories through visuals and interaction.
                    </p>
                    <p className="text-foreground/50 text-sm leading-relaxed">
                      Currently seeking OJT internship opportunities where I can apply my skills in UI/UX design, front-end development, and digital illustration.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Skills & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {["UI/UX Design", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Figma", "Digital Illustration", "Logo Design", "Photoshop", "Procreate", "Git"].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 border border-border/50 text-foreground/70">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="relative scroll-mt-0 py-20 md:py-32 px-4 overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-70" style={{ backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, oklch(0.985 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.985 0 0 / 0.05) 1px, transparent 1px)", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }} />
                <div className="absolute -top-[15%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.1_250/0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-[20%] -right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.785_0.115_274/0.15)_0%,transparent_70%)]" />
              </div>

              <div className="max-w-4xl mx-auto relative z-10 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">Get In Touch</p>
                <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] uppercase tracking-tight text-foreground mb-6">
                  Let's Work<br />Together
                </h2>
                <p className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
                  Have a project in mind or looking for a creative intern? I'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="mailto:hello@artofrain.com" className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-bold hover:bg-foreground/90 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)]">
                    Send an Email
                  </a>
                  <a href="#" className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold border border-border/50 text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all">
                    Download Resume
                  </a>
                </div>
                <div className="mt-12 flex items-center justify-center gap-6">
                  {["GitHub", "LinkedIn", "Behance"].map((platform) => (
                    <a key={platform} href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors">
                      {platform}
                    </a>
                  ))}
                </div>
                <p className="mt-16 text-foreground/30 text-xs uppercase tracking-widest">© 2026 Art of Rain. All rights reserved.</p>
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
