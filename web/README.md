# ForwardCraft — marketing site

Enterprise AI-services marketing website for the **ForwardCraft** brand:
**Custom AI agents · Workflow automation · Software integration.**

**Live:** https://forwardcraft-web.vercel.app — auto-deployed from `web/` on every push to `main`.

It is a complete, multi-page front end built with mock data. The information
architecture and design language are modeled on an enterprise AI-services
reference site, but **all brand assets, copy, logos, imagery, and data here are
original mock content** — nothing is copied from any real company.

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-based theme tokens in `globals.css`)
- **Framer Motion** (animation, reduced-motion aware)
- **Lucide React** (icons)
- No backend — all content is local mock data; forms simulate async submission.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build (static-generates every route)
npm run start    # serve the production build
npm run lint     # ESLint
```

## Project structure

```
src/
  app/                     # App Router routes (see docs/site-audit.md for the full list)
  components/
    layout/                # Header, Footer, Logo, Container, Section
    navigation/            # MegaMenu, MobileMenu
    sections/              # Reusable page sections (hero, platform, metrics, FAQ, CTA, …)
    cards/                 # Card components (case study, article, solution, industry, job, event)
    forms/                 # Newsletter, Contact, Partnership forms (simulated submit)
    ui/                    # Primitives (Button, Tabs, Accordion, Field, CoverArt, …)
    animations/            # Reveal, StaggerText, CountUp, Marquee
  data/mock/               # All mock content (typed)
  types/                   # Shared TypeScript types
  lib/                     # site config, metadata, icons, content helpers, utils
public/images/             # Generated OG image
docs/site-audit.md         # Full IA / route / component audit
```

## Replacing mock data with a real backend

Every page reads from `src/data/mock/*`, and all data conforms to the interfaces
in `src/types/index.ts`. To wire a CMS/API/database later, implement those same
interfaces from your data source and swap the imports — pages and components stay
unchanged. Forms in `src/components/forms/*` simulate submission with a Promise
and a delay; replace the simulated call with a real `fetch`/server action.

## Notes

- Restrained enterprise aesthetic: mono + grey palette, single cobalt accent, no
  cheap gradients. Design tokens live in `src/app/globals.css` (`@theme`).
- Accessibility: semantic HTML, keyboard-navigable menus/tabs/accordions, focus
  states, ARIA labels, and `prefers-reduced-motion` support throughout.
- Client logos and team avatars are generated (abstract marks / initials) — no
  real logos or photos are used.
