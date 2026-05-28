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
          </div>
        } />
        <Route path="/works" element={<WorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
