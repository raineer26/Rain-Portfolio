# Art of Rain — Personal Portfolio

A creative portfolio website built for OJT internship applications, showcasing digital illustrations, logo designs, game card art, web development projects, and more.

**Live Site:** [Coming Soon]

---

## Tech Stack

- **Framework:** React 18 (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion + GSAP (ScrollTrigger, Flip)
- **Routing:** React Router DOM
- **UI Primitives:** Radix UI (Tabs, Toggle, Toggle Group, Slot)
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge, class-variance-authority

---

## Features

### Intro Animation
- Grid pixelate-wipe transition between two scenes using Framer Motion
- Floating character icons in the background with breathing opacity and scale animations
- Auto-fades out to reveal the main content

### Hero Section (CinematicFooter)
- "Art of Rain" heading with metallic text glow effect
- Scrolling marquee with skills (UI/UX Design, Digital Illustrations, Logo Design, etc.)
- Giant "RAIN" background text
- Floating hero photo with GSAP-powered bob animation
- Glass-morphism CTA buttons (Contact Me, View Resume)
- Social links (GitHub, LinkedIn, Behance)
- Copyright footer

### Navigation
- **SlideTabs Navbar** — Floating pill-style navbar with animated cursor that slides between tabs
- Scroll-spy: auto-highlights the active section as you scroll
- Glass design with backdrop blur
- **Scroll Logo** — Rain logo fixed top-left, rotates counter-clockwise on scroll down, clockwise on scroll up, click to go home
- **Back to Top** — Floating button (bottom-right), appears after scrolling 300px, arrow hover animation

### Featured Projects Section
- Tabbed interface (Souvenir Business, Barangay System, MathPulse AI, Art Gallery)
- Live iframe previews rendered at 1280px desktop width, scaled down with CSS transform
- Mini browser frame (traffic lights, URL bar, loading spinner)
- Radial gradient glows and subtle shape decorations in background
- "Visit Site" button per project
- Scroll-triggered reveal animations

### Works Preview (Story Scroll)
- GSAP-powered pinned scroll sections with rotation transitions
- 3 sections: Game Art, Brand & Print, Gallery CTA
- Each section has: faded tilted card background, large illustration with scroll-triggered entrance animation
- Section 3 uses PortfolioGallery — 3D fanned/overlapping card layout with hover interactions
- "View All Works" button navigates to dedicated works page

### Dedicated Works Page (`/works`)
- **Grid View:** Responsive columns (5 → 4 → 3 → 2), hover overlay with title/meta, click to open in detail view
- **Detail View (FocusRail):** 3D carousel with drag/swipe/keyboard/scroll navigation, blurred ambient background, title + description + category per piece
- Filter tabs: All, Game Cards, Logos, Posters, Maps
- Toggle between Grid and Detail views
- Sticky header with backdrop blur
- Full-page blurred artwork background in detail mode
- Back button preserves scroll position on main page

### Responsive Design
- All sections adapt to viewport size using relative units (vh, vw, vmin, clamp)
- Mobile-first approach with progressive enhancement
- Photo hidden on mobile in hero section, centered text instead
- Navbar and all interactive elements work on touch devices

### Performance
- WebP images (150–230KB each)
- WAAPI-backed animations where possible (transform, opacity)
- No unnecessary dependencies
- Scroll-triggered animations use `once: true` to avoid re-triggering

---

## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── back-to-top.tsx          # Floating back-to-top button
│       ├── badge.tsx                # shadcn Badge component
│       ├── button.tsx               # shadcn Button component
│       ├── feature-projects.tsx     # Featured Projects section with iframe previews
│       ├── flip-reveal.tsx          # GSAP Flip animation for filtering
│       ├── focus-rail.tsx           # 3D carousel detail view
│       ├── intro-animation.tsx      # Grid pixelate-wipe intro
│       ├── motion-footer.tsx        # Hero/CinematicFooter section
│       ├── portfolio-gallery.tsx    # 3D fanned card gallery
│       ├── reveal.tsx               # Scroll-triggered reveal wrapper
│       ├── scroll-logo.tsx          # Rotating logo on scroll
│       ├── scroll-tilted-grid.tsx   # Editorial tilt grid
│       ├── slide-tabs-navbar.tsx    # Animated pill navbar
│       ├── story-scroll.tsx         # GSAP pinned scroll sections
│       └── works-preview.tsx        # Works preview with story scroll
├── lib/
│   └── utils.ts                     # cn() helper (clsx + tailwind-merge)
├── pages/
│   └── works.tsx                    # Dedicated works gallery page
├── App.tsx                          # Main app with routing
├── main.tsx                         # Entry point
└── index.css                        # Tailwind + CSS variables (dark theme)

public/
├── rain_logo.png                    # Logo/favicon
├── hero_photo.png                   # Hero section photo
├── preview_game.png                 # Siren illustration for works preview
├── cute-icon-1.png                  # Floating icon (drawing)
├── cute-icon-2.png                  # Floating icon (laptop)
├── mythical_1.webp                  # Game card - Manananggal
├── mythical_2.webp                  # Game card - Aswang
├── rare_1.webp                      # Game card - Mount Uwe
└── rare_2.webp                      # Game card - Kulam
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Color Palette (Dark Theme)

| Token | Value | Description |
|-------|-------|-------------|
| Background | `oklch(0.145 0 0)` | Near-black |
| Foreground | `oklch(0.985 0 0)` | Near-white |
| Primary | `oklch(0.785 0.115 274)` | Purple/violet accent |
| Secondary | `oklch(0.6 0.1 250)` | Blue-purple |
| Muted Foreground | `oklch(0.556 0 0)` | Medium gray |
| Border | `oklch(0.3 0 0)` | Dark gray |
| Destructive | `oklch(0.577 0.245 27.325)` | Red |

---

## Credits

Designed and developed by **Art of Rain** © 2026
