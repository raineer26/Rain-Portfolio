import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Globe, School, Brain, ExternalLink, Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

interface Project {
  value: string;
  icon: React.ReactNode;
  label: string;
  badge: string;
  title: string;
  description: string;
  url: string;
}

const projects: Project[] = [
  {
    value: "souvenir",
    icon: <Globe className="h-auto w-4 shrink-0" />,
    label: "Souvenir Business",
    badge: "Client Website",
    title: "Crafted by Print Habit",
    description:
      "A fully designed and developed e-commerce website for a souvenir and printing business. Features product showcases, responsive layouts, and a clean modern UI.",
    url: "https://crafted-by-print-habit.vercel.app/",
  },
  {
    value: "barangay",
    icon: <School className="h-auto w-4 shrink-0" />,
    label: "Barangay System",
    badge: "Web Application",
    title: "Barangay Equipment Borrowing & Scheduling",
    description:
      "A community management system for Barangay Mapulang Lupa that handles equipment borrowing, scheduling, and user management with an intuitive interface.",
    url: "https://barangaymapulanglupa.vercel.app/user.html",
  },
  {
    value: "mathpulse",
    icon: <Brain className="h-auto w-4 shrink-0" />,
    label: "MathPulse AI",
    badge: "Capstone Project",
    title: "MathPulse AI — Intelligent Math Tutor",
    description:
      "An AI-powered web application built as a capstone project. Helps students learn math through interactive problem-solving and intelligent feedback.",
    url: "https://huggingface.co/spaces/Deign86/mathpulse-ai",
  },
  {
    value: "gallery",
    icon: <Palette className="h-auto w-4 shrink-0" />,
    label: "Art Gallery",
    badge: "Personal Portfolio",
    title: "Art of Rain — Artwork Collection",
    description:
      "A showcase of my digital illustrations, character designs, and traditional artwork compiled into a personal art portfolio.",
    url: "https://my-portfolio-alpha-tan-92.vercel.app/index.html",
  },
];

function BrowserFrame({ url, title }: { url: string; title: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 1280);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full rounded-xl border border-border overflow-hidden bg-background shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {/* URL bar */}
        <div className="flex-1 mx-3 px-3 py-1.5 rounded-md bg-background/80 border border-border text-[11px] md:text-xs text-muted-foreground truncate font-mono">
          {url}
        </div>
      </div>
      {/* Iframe — rendered at 1280px wide, scaled down to fit */}
      <div className="relative w-full aspect-video max-h-[50vh] bg-background overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 z-10">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <div className="absolute top-0 left-0 w-[1280px] h-[800px] origin-top-left" style={{ transform: `scale(${scale})` }}>
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section className="py-10 md:py-16 lg:py-28 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-secondary/12 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      {/* Subtle shapes */}
      <div className="absolute top-32 right-20 w-20 h-20 border border-border/20 rounded-full pointer-events-none" />
      <div className="absolute bottom-40 left-16 w-12 h-12 border border-border/15 rotate-45 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="flex flex-col items-center gap-3 text-center mb-8">
          <Badge variant="outline">Portfolio</Badge>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl text-foreground tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-lg">
            A selection of websites and applications I've designed and developed.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
        <Tabs defaultValue={projects[0].value} className="w-full">
          <TabsList className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6">
            {projects.map((project) => (
              <TabsTrigger
                key={project.value}
                value={project.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground transition-colors cursor-pointer"
              >
                {project.icon} {project.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="rounded-2xl bg-muted/30 border border-border/50 p-3 sm:p-5 md:p-8">
            {projects.map((project) => (
              <TabsContent
                key={project.value}
                value={project.value}
                className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-10 items-center"
              >
                {/* Info */}
                <div className="flex flex-col gap-4 order-2 lg:order-1">
                  <Badge variant="outline" className="w-fit">
                    {project.badge}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                  <Button
                    className="mt-2 w-fit gap-2 bg-white text-black hover:bg-white/90 font-bold"
                    size="lg"
                    asChild
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit Site <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                {/* Browser Preview */}
                <div className="order-1 lg:order-2">
                  <BrowserFrame url={project.url} title={project.title} />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
