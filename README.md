# Art of Rain — Personal Portfolio

A creative portfolio website showcasing digital illustrations, game card art, logo designs, storyboards, product designs, and web development projects. Features cinematic intro animations, interactive scroll-driven previews, a masonry gallery with detail view, and responsive design with playful micro-interactions throughout.

**Live Site:** [rain-portfolio.vercel.app](https://rain-portfolio.vercel.app)

---

## Tech Stack

- **Framework:** React 18 (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion + GSAP (ScrollTrigger)
- **Routing:** React Router DOM
- **UI Primitives:** Radix UI (Tabs)
- **Icons:** Lucide React
- **Email:** EmailJS
- **Utilities:** clsx, tailwind-merge, class-variance-authority
- **Deployment:** Vercel

---

## Features

### Intro Animation
- Grid pixelate-wipe transition between two scenes
- "Welcome to" text slides in, then Art of Rain logo pops up with spring bounce
- Floating character icons in background
- Auto-fades out to reveal main content

### Hero Section
- Stylized "Art of Rain" logo image with tilt hover effect
- Scrolling marquee with skills
- Giant "RAIN" background text
- Floating hero photo with bob animation
- Glass-morphism CTA buttons (Contact Me scrolls to contact, View Resume opens PDF)
- Social links (GitHub, LinkedIn, Behance)

### Navigation
- **Desktop:** Glass pill navbar with animated cursor, marker highlight per tab
- **Mobile:** Hamburger menu with text-roll hover effect (letter stagger animation)
- Scroll-spy auto-highlights active section
- Dynamic speech bubble on logo hover (changes message per section)
- Logo rotates on scroll

### Featured Projects (6 projects)
- Souvenir Business, Barangay System, MathPulse AI, V-Serve, CineSense
- Each with role, description, and tech stack pills
- **Desktop:** Animated sliding pill tabs
- **Mobile:** Dropdown selector
- Live iframe previews scaled to fit
- Mini browser frame (traffic lights, URL bar)

### Creative Works Preview
- 3 sections: Game Art, Brand & Print, Gallery CTA
- Slideshow backgrounds cycling every 4s with crossfade
- Floating preview images with hover effects
- Fanned cards behind main preview images (desktop)
- Scroll-linked progress bar with custom star icon
- Section 2 flipped layout (image left, text right)

### Dedicated Works Page (`/works`)
- **37 works** across 6 categories: Game Cards, Logos, Maps, Posters, Motion & Story, Concept Design
- **Grid view:** Masonry layout, dynamic columns per category, stylized header images per section
- **Detail view:** Carousel with zoom-on-click, dynamic category header updates on swipe
- YouTube video embed (autoplay muted) in Motion & Story
- Dropdown filter + icon-only view toggle
- Back button: detail → grid → home

### About Section
- Two-column layout: bio left, bento tools grid right
- Highlighted key phrases in primary color
- **Creative Suite:** 6 tool icons (Figma, Krita, IbisPaint, Canva, Photoshop, Illustrator) with magnetic hover + floating animation
- **Dev Stack & Collaboration:** Pill badges with hover effects
- Speech bubble "Current Quest" with typewriter effect and animated rain logo

### Contact Section
- Two-column: text left, form right
- **Working EmailJS contact form** (name, email, message → sends to Gmail)
- Social links (GitHub, LinkedIn, Resume)
- Status feedback on send

### Consistent Design Language
- Stylized header images with tilt + glow hover effects
- Glass/backdrop-blur containers
- Radial glows + grid texture + halftone dot overlay
- Warm dark theme with purple/blue accents
- Plus Jakarta Sans font

---

## Project Structure

```
src/
├── components/ui/
│   ├── back-to-top.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── feature-projects.tsx
│   ├── focus-rail.tsx
│   ├── intro-animation.tsx
│   ├── motion-footer.tsx
│   ├── portfolio-gallery.tsx
│   ├── reveal.tsx
│   ├── scroll-logo.tsx
│   ├── slide-tabs-navbar.tsx
│   ├── story-scroll.tsx
│   └── works-preview.tsx
├── pages/
│   └── works.tsx
├── lib/utils.ts
├── App.tsx
├── main.tsx
└── index.css

public/
├── cards/ (8 game card illustrations)
├── logos/ (2 logo designs)
├── maps/ (1 map)
├── Stylized headers (art_of_rain, featured_projects, creative_works, about_me, contact_me, game_cards, logo_designs, game_map, posters, motion_story, concept_design)
├── Tool icons (figma, krita, ibispaint, canva, photoshop, illustrator)
├── Storyboards (1-12)
├── Posters, moodboards, product designs
├── web_logo.png, hero_photo.png, preview_game.png
├── progress_bar_icon.png
└── Rosado_Resume.pdf
```

---

## Getting Started

```bash
npm install
npm run dev
npm run build
```

---

## Deployment

Configured for Vercel with `vercel.json` handling SPA routing.

---

## Credits

Designed and developed by **Art of Rain** © 2026
