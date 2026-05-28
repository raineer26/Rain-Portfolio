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
- **SlideTabs Navbar** — Floating pill-style navbar with animated cursor that slides between tabs (desktop)
- **Hamburger Menu** — Full-screen overlay with dramatic text entrance animation (slide up + rotation), background sweep hover effect on links (mobile)
- Scroll-spy: auto-highlights the active section as you scroll
- Glass design with backdrop blur
- **Scroll Logo** — Rain logo fixed top-left, rotates counter-clockwise on scroll down, clockwise on scroll up, click to go home
- **Back to Top** — Floating button (bottom-right), appears after scrolling 300px, hover/tap scale animation

### Featured Projects Section
- Tabbed interface (Souvenir Business, Barangay System, MathPulse AI, Art Gallery)
- **Desktop:** Animated sliding pill tabs with layoutId spring animation
- **Mobile:** Dropdown selector with chevron, animated expand/collapse
- Live iframe previews rendered at 1280px desktop width, scaled down with CSS transform
- Mini browser frame (traffic lights, URL bar, loading spinner)
- Radial gradient glows and subtle shape decorations in background
- "Visit Site" button per project
- Scroll-triggered reveal animations

### Works Preview (Story Scroll)
- GSAP-powered pinned scroll sections with rotation transitions
- 3 sections: Game Art, Brand & Print, Gallery CTA
- **Slideshow backgrounds** — crossfading images from each category every 4 seconds with AnimatePresence
- **Floating preview images** — CSS float animation (bob up/down) + hover scale/rotate effect
- Grid texture + radial glow backgrounds matching site-wide design language
- Section 3 uses PortfolioGallery — 3D fanned/overlapping card layout with hover interactions
- "View All Works" button navigates to dedicated works page

### Dedicated Works Page (`/works`)
- **Masonry Grid View:** CSS columns layout (5 → 4 → 3 → 2), natural image heights, tilt hover with 3D perspective, staggered entrance, rounded corners
- **Detail View (FocusRail):** Two-column layout with carousel left, info right, blurred ambient background
- **Dynamic filter** — auto-derived from data with item counts, animated sliding pill (desktop), dropdown selector (mobile)
- **View toggle** — animated sliding pill with layoutId, icon-only on mobile
- Rich background: grid texture, radial glows (purple/blue), noise overlay, floating shapes
- Full-page blurred artwork background in detail mode
- Back button with hover/tap animation, preserves scroll position on main page

### Responsive Design
- All sections adapt to viewport size using relative units (vh, vw, vmin, clamp)
- Mobile-first approach with progressive enhancement
- **Hamburger menu** on mobile with full-screen overlay
- **Dropdown selectors** replace pill tabs on mobile (Featured Projects, Works filter)
- **Icon-only view toggle** on mobile
- Reduced image sizes and card dimensions on mobile
- Photo hidden on mobile in hero section, centered text instead
- Touch-friendly interactions throughout

### Performance
- WebP images (150–230KB each)
- WAAPI-backed animations where possible (transform, opacity)
- No unnecessary dependencies
- Scroll-triggered animations use `once: true` to avoid re-triggering

### Consistent Animations
- All interactive buttons use `whileHover: scale 1.05` / `whileTap: scale 0.95` (spring physics)
- Navbar tabs have `whileTap: scale 0.92` for click feedback
- View All Works button has hover scale + tap shrink
- Back-to-top button has hover/tap scale
- Animated sliding pills (layoutId) on all tab/filter interfaces

---

## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── back-to-top.tsx          # Floating back-to-top button (hover/tap animations)
│       ├── badge.tsx                # shadcn Badge component
│       ├── button.tsx               # shadcn Button component
│       ├── feature-projects.tsx     # Featured Projects section (dropdown mobile, pill tabs desktop)
│       ├── flip-reveal.tsx          # GSAP Flip animation for filtering
│       ├── focus-rail.tsx           # 3D carousel detail view
│       ├── intro-animation.tsx      # Grid pixelate-wipe intro
│       ├── motion-footer.tsx        # Hero/CinematicFooter section
│       ├── portfolio-gallery.tsx    # 3D fanned card gallery (cardsOnly mode)
│       ├── reveal.tsx               # Scroll-triggered reveal wrapper
│       ├── scroll-logo.tsx          # Rotating logo on scroll
│       ├── scroll-tilted-grid.tsx   # Editorial tilt grid
│       ├── slide-tabs-navbar.tsx    # Animated pill navbar + hamburger menu
│       ├── story-scroll.tsx         # GSAP pinned scroll sections
│       └── works-preview.tsx        # Works preview with slideshow backgrounds
├── lib/
│   └── utils.ts                     # cn() helper (clsx + tailwind-merge)
├── pages/
│   └── works.tsx                    # Dedicated works gallery page (masonry + detail)
├── App.tsx                          # Main app with routing
├── main.tsx                         # Entry point
└── index.css                        # Tailwind + CSS variables + float keyframe + scrollbar-hide

public/
├── cards/                           # Game card illustrations
│   ├── mythical_1.webp              # Manananggal
│   ├── mythical_2.webp              # Aswang
│   ├── rare_1.webp                  # Mount Uwe
│   ├── rare_2.webp                  # Kulam
│   ├── whale_CARD.webp              # Whale
│   ├── carabao_CARD.webp            # Carabao
│   ├── eagle_CARD.webp              # Eagle
│   └── tarsier_CARD.webp            # Tarsier
├── logos/                           # Logo designs
│   ├── LOGO_gora_na_explorer.webp   # Gora Na Explorer brand
│   └── LOGO_mathpulse_ai.webp      # MathPulse AI brand
├── maps/                            # Map illustrations
│   └── MAP_gora_na_explorer.webp   # Gora Na Explorer map
├── rain_logo.png                    # Logo/favicon
├── hero_photo.png                   # Hero section photo
├── preview_game.png                 # Siren illustration for works preview
├── cute-icon-1.png                  # Floating icon (drawing)
└── cute-icon-2.png                  # Floating icon (laptop)

vercel.json                          # SPA rewrite rules for deployment
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

## Deployment

The project is configured for Vercel deployment with `vercel.json` handling SPA routing.

```bash
# Deploy via CLI
npx vercel

# Or connect GitHub repo at vercel.com/new
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
