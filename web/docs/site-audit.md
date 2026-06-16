# ForwardCraft — Site Audit

## IP boundary

This site **replicates the information architecture and design language** of the public
enterprise-AI reference site (invisibletech.ai) — the route taxonomy, page composition, section
ordering, navigation model, and interaction patterns. **Everything else is original.** The brand name
(**ForwardCraft**), logos and marks, all copy, all client names and "client logos," every metric, and
all imagery are original mock content authored for this design-reference build. Nothing was copied
from the reference site: no text, no assets, no real client identities. Client logos are abstract
generated marks (`MockLogo` / `LogoWall`); cover art is procedurally generated from a seed string
(`CoverArt`). Treat all content here as placeholder.

This document audits the site as built under `src/app/**`, `src/components/**`, and `src/data/mock/**`.

---

## 1. Complete route list

All routes are statically generated (App Router). Dynamic segments enumerate their slugs from mock
data via `generateStaticParams`. "State" routes are the App Router special files.

| Route | Type | Purpose |
| --- | --- | --- |
| `/` | static | Homepage / brand landing |
| `/industries` | static | Industries index |
| `/industries/[slug]` | dynamic | Industry detail (10 slugs) |
| `/solutions` | static | Solutions index |
| `/solutions/[slug]` | dynamic | Solution detail (7 slugs) |
| `/ai-training` | static | AI training overview |
| `/ai-training/[slug]` | dynamic | AI training capability detail (5 slugs) |
| `/case-studies` | static | Case studies listing (filterable browser) |
| `/case-studies/[slug]` | dynamic | Case study detail (9 slugs) |
| `/blog` | static | Blog listing |
| `/blog/[slug]` | dynamic | Article detail (blog-kind articles) |
| `/reports` | static | Reports listing |
| `/reports/[slug]` | dynamic | Report detail |
| `/research` | static | Research listing |
| `/research/[slug]` | dynamic | Research detail (shares article detail) |
| `/newsroom` | static | Newsroom listing |
| `/newsroom/[slug]` | dynamic | News item detail (8 slugs) |
| `/events` | static | Events listing (upcoming + past) |
| `/newsletter` | static | Newsletter subscribe landing |
| `/about` | static | Company / about |
| `/how-we-work` | static | Delivery model |
| `/partnerships` | static | Partners + partnership inquiry |
| `/careers` | static | Careers index (job board) |
| `/careers/[slug]` | dynamic | Job detail (14 slugs) |
| `/contact` | static | Contact / book-a-demo |
| `/privacy` | static | Privacy center (legal) |
| `/terms` | static | Terms of service (legal) |
| `/not-found` (`not-found.tsx`) | state | 404 page |
| `/_loading` (`loading.tsx`) | state | Global route loading skeleton |
| `/_error` (`error.tsx`) | state | Root error boundary |

> Note: `/about`, `/how-we-work`, `/partnerships`, `/careers`, `/careers/[slug]`, and `/contact` are
> defined in the navigation/footer and linked throughout; they are authored as bespoke pages (some by
> concurrent work). The four resource detail routes that carry article-kind content (`/blog/[slug]`,
> `/reports/[slug]`, `/research/[slug]`, `/newsroom/[slug]`) all render through the shared
> `ArticleDetail` template.

### Generated dynamic slugs

- **`/industries/[slug]`** (10): asset-management, banking, consumer, energy, healthcare, insurance,
  life-sciences, private-equity, public-sector, sports.
- **`/solutions/[slug]`** (7): back-office-automation, computer-vision, contact-center,
  demand-forecasting, custom-solutions, app-modernization, investment-analysis.
- **`/ai-training/[slug]`** (5): rl-environments, evaluations, expert-network, data-platform, agents.
- **`/case-studies/[slug]`** (9): atlas-bank-onboarding, meridian-capital-research, northwind-claims,
  harborline-logistics, vertex-retail-vision, helios-energy-vision, cobalt-pharma-evidence,
  sterling-pe-diligence, civic-services-modernization.
- **`/blog/[slug]`** (8, `kind: "blog"`): the-last-mile-of-enterprise-ai, evaluations-as-a-release-gate,
  human-in-the-loop-that-scales, governing-agents-that-take-action,
  probabilistic-forecasting-for-operators, integration-is-the-product, build-buy-or-partner-for-ai,
  measuring-roi-on-ai-deployments.
- **`/research/[slug]`** (3, `kind: "research"`): frontier-evaluation-methods-2026,
  designing-rl-environments-for-real-work, pii-redaction-at-enterprise-scale.
- **`/reports/[slug]`** (6): state-of-enterprise-ai-2026, roi-benchmarks-back-office-automation,
  building-trust-in-production-agents, ai-in-financial-services-2026, computer-vision-in-operations,
  ai-talent-and-the-expert-network.
- **`/newsroom/[slug]`** (8): forwardcraft-raises-series-c, forwardcraft-opens-london-office,
  forwardcraft-cumulus-partnership, forwardcraft-soc2-type2,
  forwardcraft-enterprise-ai-company-of-year, launching-evaluation-suite, expert-network-passes-10k,
  forwardcraft-expands-apac.
- **`/events`** (6 items, listing only; no detail route): enterprise-ai-summit-2026,
  webinar-evaluation-as-release-gate, finserv-ai-roundtable-london,
  workshop-governing-production-agents, healthcare-ai-forum-singapore,
  webinar-forecasting-for-operators.
- **`/careers/[slug]`** (14): senior-ml-engineer, forward-deployed-engineer,
  applied-research-scientist, product-designer, solutions-architect, security-engineer,
  data-platform-engineer, expert-network-lead, enterprise-account-executive,
  technical-program-manager, ml-eval-intern, frontend-engineer, people-partner,
  contract-vision-specialist.

---

## 2. Page purposes

- **`/`** — Brand landing: positioning, platform modules, solutions, industries, proof, newsletter.
- **`/industries`** — Index of all 10 industries with cards into detail pages.
- **`/industries/[slug]`** — Industry-specific challenges, use cases, delivery, impact, related work.
- **`/solutions`** — Index of all 7 cross-industry solutions.
- **`/solutions/[slug]`** — Solution challenge → what we build → workflow → outcomes → proof.
- **`/ai-training`** — Overview of the AI-training practice and its five capabilities.
- **`/ai-training/[slug]`** — Single capability deep-dive (overview, capabilities, metrics, FAQs).
- **`/case-studies`** — Filterable browser of customer outcomes.
- **`/case-studies/[slug]`** — Single engagement narrative with results and testimonial.
- **`/blog`** — Article listing (engineering, strategy, operations).
- **`/blog/[slug]`** — Long-form article with TOC, share, related.
- **`/reports`** — Gated/long-form reports listing.
- **`/reports/[slug]`** — Report detail (shared article template).
- **`/research`** — Applied-research listing.
- **`/research/[slug]`** — Research post detail (shared article template).
- **`/newsroom`** — Company news listing.
- **`/newsroom/[slug]`** — News item detail (shared article template).
- **`/events`** — Upcoming and past events plus newsletter signup.
- **`/newsletter`** — Dedicated subscribe landing with value props and recent issues.
- **`/about`** — Company story, team, awards, timeline.
- **`/how-we-work`** — The delivery model from discovery to governed production.
- **`/partnerships`** — Partner ecosystem and partnership inquiry form.
- **`/careers`** — Job board with department/location filtering.
- **`/careers/[slug]`** — Single role: summary, responsibilities, requirements, apply.
- **`/contact`** — Book-a-demo / general contact form plus office details.
- **`/privacy`** — Mock privacy center (6 sections, last-updated, cookie link).
- **`/terms`** — Mock terms of service (7 sections, last-updated).
- **404 / loading / error** — Global state pages.

---

## 3. Section order per page

**Home (`/`)**
1. HomeHero
2. Client logo wall (`LogoWall`, surface band)
3. Platform — "Building blocks, not black boxes" (`PlatformExplorer`)
4. Solutions showcase (`SolutionsShowcase`, tabbed)
5. Industries grid (10 `IndustryCard`)
6. Metrics band (`MetricsBand`, surface)
7. Testimonials (dark, `TestimonialCarousel`)
8. Featured case studies (3 `CaseStudyCard`)
9. Newsletter band (dark, `NewsletterForm`)
10. FAQ (`FaqSection`)
11. CTA (`CTASection`)

**Industry detail (`/industries/[slug]`)**
1. PageHero (eyebrow + tagline + summary, aside = cover art + hero stat / count-up)
2. Challenges grid
3. AI use cases grid
4. How we deliver (`WorkflowSteps`)
5. Core capabilities (`CapabilityGrid`)
6. Impact + metrics (dark, `MetricsBand`)
7. Related solutions (`RelatedGrid`, conditional)
8. Related case studies (`RelatedGrid`, conditional)
9. FAQ
10. CTA

**Industries index (`/industries`)** — PageHero → grid of all industries → CTA.

**Solution detail (`/solutions/[slug]`)**
1. PageHero
2. The challenge
3. What we build / "The solution" (`CapabilityGrid`)
4. How it works (`WorkflowSteps`)
5. Business outcomes
6. Metrics (dark, `MetricsBand`)
7. Featured case study (conditional)
8. Related industries (`RelatedGrid`, conditional)
9. FAQ
10. CTA

**Solutions index (`/solutions`)** — PageHero → solutions grid → CTA.

**AI training overview (`/ai-training`)**
1. PageHero
2. Our approach
3. The five capabilities
4. Headline metrics (`MetricsBand`)
5. FAQ
6. CTA

**AI training detail (`/ai-training/[slug]`)**
1. PageHero
2. Overview prose
3. Capabilities (`CapabilityGrid`)
4. Metrics (`MetricsBand`)
5. FAQ
6. Related AI training (`RelatedGrid`)
7. CTA

**Case studies listing (`/case-studies`)** — PageHero → `CaseStudiesBrowser` (filter/search grid) → CTA.

**Case study detail (`/case-studies/[slug]`)**
1. PageHero
2. Client background / intro
3. Narrative: challenge / approach / solution
4. Results (`MetricsBand`)
5. Testimonial (dark, conditional)
6. Related stories (`RelatedGrid`, conditional)
7. CTA

**Resource listing (`/blog`, `/reports`, `/research`, `/newsroom`)**
1. PageHero
2. `ResourceListing` (featured block + category filter + card grid + pagination)
3. CTA

**Resource detail (`/blog/[slug]`, `/reports/[slug]`, `/research/[slug]`, `/newsroom/[slug]`)** —
`ArticleDetail`: breadcrumbs → cover art → title/meta → share row → TOC (sticky aside) + prose body →
related articles grid.

**Events (`/events`)** — PageHero → Upcoming events → Past events (conditional) → Newsletter signup band → CTA.

**Newsletter (`/newsletter`)** — PageHero (with inline `NewsletterForm`) → value props → prominent dark signup band → recent issues → CTA.

**About (`/about`)** — Hero → company story → team grid → awards → timeline → CTA (bespoke).

**How we work (`/how-we-work`)** — Hero → delivery-model `WorkflowSteps` → capability/method detail → metrics → FAQ → CTA (bespoke).

**Partnerships (`/partnerships`)** — Hero → partner ecosystem grid → why-partner → `PartnershipForm` → CTA (bespoke).

**Careers (`/careers`)** — Hero → culture/values → filterable job board (`JobCard`) → CTA (bespoke).

**Job detail (`/careers/[slug]`)** — PageHero (role meta) → summary → responsibilities → requirements → apply CTA → related roles.

**Contact (`/contact`)** — Hero → contact / book-a-demo form (`ContactForm`) → offices → CTA (bespoke).

**Legal (`/privacy`, `/terms`)** — PageHero → mock-content note → last-updated → max-w-3xl prose with numbered h2/h3 sections.

---

## 4. Cross-link map

- **Header mega menu** (`Header` → `MegaMenu`) — five top items (Industries, Solutions, AI training,
  Resources, Company), each opening a panel of grouped leaf links plus a "feature" promo card linking
  to a deeper page (e.g. Industries → banking, Solutions → how-we-work, AI training → expert-network,
  Resources → newsletter). Header also carries a primary "Book a demo" CTA → `/contact`.
- **Footer** (`Footer`) — five columns flattened from the same nav groups (Industries, Solutions, AI
  training, Resources, Company) via `footerColumns`, plus a legal/utility row linking `/privacy`,
  `/terms`, and the cookie-preferences trigger.
- **Mobile menu** (`MobileMenu`) — full-screen accordion mirroring the mega-menu groups.
- **Related sections** — Industry detail ↔ solutions/case studies; Solution detail ↔ industries/case
  study; AI-training detail ↔ other AI-training capabilities; Case study detail ↔ related stories;
  Resource detail ↔ related articles (by shared tags / same kind).
- **CTAs** — `CTASection` closes nearly every page and points to `/contact` ("Book a demo"). Listing
  index pages link into detail pages via cards; the home page links to each index ("All solutions",
  "All industries", "All case studies").
- **Cross-section links** — Industry/solution detail "Book a demo" → `/contact`; events & newsletter
  pages embed `NewsletterForm`; privacy page links to footer cookie preferences in prose.

---

## 5. Reusable component inventory

**layout/**
- `Container` — centered max-width wrapper with responsive gutters.
- `Section` — tonal band (paper/surface/dark) with consistent vertical rhythm.
- `Header` — sticky top nav, desktop mega menu trigger, mobile menu toggle, primary CTA.
- `Footer` — multi-column sitemap + legal/cookie row.
- `Logo` — original geometric ForwardCraft wordmark.

**navigation/**
- `MegaMenu` — desktop mega-menu panel for a single nav item (groups + feature promo).
- `MobileMenu` — full-screen mobile nav with accordion submenus.

**sections/**
- `PageHero` — generic inner-page hero (eyebrow, title, description, breadcrumbs, actions, aside).
- `HomeHero` — bespoke asymmetric homepage hero with schematic graphic.
- `HeroGraphic` — animated schematic used in the home hero.
- `LogoWall` — wall of abstract mock client marks.
- `PlatformExplorer` — interactive mock "dashboard": node flow + metric chips per module.
- `SolutionsShowcase` — tabbed solutions grid filtered by category.
- `CapabilityGrid` — icon/title/description capability grid.
- `WorkflowSteps` — numbered process steps (horizontal desktop / stacked mobile).
- `MetricsBand` — row of headline metrics with count-up.
- `TestimonialCarousel` — auto-advancing testimonial carousel with manual controls.
- `RelatedGrid` — heading + grid wrapper for "related content."
- `FaqSection` — FAQ accordion with `FAQPage` structured data.
- `CTASection` — dark closing call-to-action band reused across pages.

**cards/**
- `ArticleCard` — listing card for any long-form content (blog/report/research/news).
- `CaseStudyCard` — case-study teaser card.
- `EventCard` — event teaser card.
- `IndustryCard` — industry teaser card.
- `JobCard` — open-role card for the job board.
- `SolutionCard` — solution teaser card.

**forms/**
- `ContactForm` — book-a-demo / general contact form with client-side validation + feedback.
- `NewsletterForm` — email capture with success/error states (light + inverse variants).
- `PartnershipForm` — partnership inquiry form.

**ui/**
- `Accordion` — expand/collapse panels (single or multi-open).
- `Badge` — small status/label pill.
- `Button` — link or button, variants (primary/secondary/ghost/inverse), sizes, optional arrow.
- `CookieConsent` — cookie banner + preferences modal (+ footer trigger button); persists to localStorage.
- `CoverArt` — seeded procedural cover graphic (no real imagery).
- `EmptyState` — shown when a filtered/searched list returns nothing.
- `Field` — labeled form-field wrapper (input/textarea/select).
- `MockLogo` — abstract generated company mark.
- `Pagination` — numbered pagination with prev/next and truncation.
- `SearchInput` — controlled search box with icon + clear.
- `SectionHeading` — eyebrow + title + intro heading block (light/invert).
- `Skeleton` / `CardSkeleton` — shimmering loading placeholders.
- `Tabs` — accessible tab strip with animated active indicator.

**animations/**
- `Reveal` — scroll-triggered fade/slide-in wrapper.
- `StaggerText` — staggered fade-up of stacked lines.
- `CountUp` — animated number count-up when in view.
- `Marquee` — infinite horizontal scroll (pause-on-hover option).

**casestudies/**
- `CaseStudiesBrowser` — client-side filter/search/grid over case studies.

**resources/**
- `ResourceListing` — featured block + category filter + card grid + pagination for a content kind.
- `ArticleDetail` — full article reading view (cover, meta, share, TOC, prose, related).
- `ArticleToc` — sticky table-of-contents derived from article headings.

---

## 6. Desktop vs mobile differences

- **Primary nav:** desktop mega-menu panels (`MegaMenu`) → mobile full-screen accordion (`MobileMenu`).
- **Footer:** multi-column grid on desktop → stacked/accordion columns on mobile.
- **Multi-column grids** (industries, use cases, capabilities, card grids): 3–5 columns on desktop →
  2 columns on tablet → single stacked column on mobile.
- **WorkflowSteps:** horizontal numbered flow on desktop → vertical stacked steps on mobile.
- **Tabs** (`SolutionsShowcase`, `Tabs`): horizontally scrollable tab strip on narrow viewports.
- **Sticky asides:** article TOC (`ArticleToc`) is a sticky sidebar on desktop, collapses/moves inline
  on mobile; PageHero aside drops below the headline on mobile (`lg:grid-cols-[1.2fr_1fr]` → single col).
- **PlatformExplorer / dashboards:** side-by-side detail on desktop → stacked on mobile.
- **Hero typography** scales down (`text-4xl md:text-6xl`). All layouts are mobile-first with no
  horizontal overflow.

---

## 7. Animation & interaction inventory

- **Scroll reveal** — `Reveal` (fade/slide-in on enter) used across hero, grids, sections.
- **Staggered text** — `StaggerText` for sequential line fade-ups.
- **Count-up** — `CountUp` animates metrics in `MetricsBand` and hero stats when in view.
- **Marquee** — `Marquee` / `LogoWall` infinite scroll (CSS `fc-marquee`, pause-on-hover).
- **Tab transitions** — `Tabs` / `SolutionsShowcase` animated active indicator + content swap.
- **Accordion** — `Accordion`, `FaqSection`, mobile menu expand/collapse.
- **Mega-menu open/close** — `Header` + `MegaMenu` hover/focus panel transitions.
- **Mobile menu** — `MobileMenu` full-screen slide-in with accordion submenus.
- **Carousel** — `TestimonialCarousel` auto-advance + manual prev/next.
- **Form feedback** — `ContactForm`, `NewsletterForm`, `PartnershipForm` inline validation + success/error states.
- **Skeletons** — `Skeleton` / `CardSkeleton` shimmer in `loading.tsx`.
- **Cookie banner** — `CookieConsent` banner + preferences modal, localStorage-persisted.
- **prefers-reduced-motion** — honored broadly: `Reveal`, `StaggerText`, `CountUp`, `Marquee`,
  `TestimonialCarousel`, `Accordion`, `Tabs`, `HeroGraphic`, `Header`, `MobileMenu`, `ArticleDetail`,
  and `CookieConsent` all check reduced-motion (or use CSS that respects it), degrading to instant/no
  motion.

---

## 8. Mock-data map

All under `src/data/mock/` — original placeholder data only.

| File | Drives |
| --- | --- |
| `navigation.ts` | `navigation` (mega menu + mobile menu) and `footerColumns` (footer). |
| `industries.ts` | `industries` + `getIndustry()` — industries index & detail (10). |
| `solutions.ts` | `solutions` + `getSolution()` — solutions index & detail (7). |
| `aiTraining.ts` | `aiTrainingProducts` + `getAiTrainingProduct()` — AI-training overview & detail (5). |
| `caseStudies.ts` | `caseStudies` + `getCaseStudy()` — case-studies browser, detail, home & related grids (9). |
| `articles.ts` | `articles` (kind blog/research) + `getArticle()` — blog & research listings/details. |
| `reports.ts` | `reports` + `getReport()` — reports listing & detail (6). |
| `news.ts` | `news` + `getNews()` — newsroom listing & detail (8). |
| `events.ts` | `events` + `getEvent()` — events listing (upcoming/past). |
| `jobs.ts` | `jobs`, `departments`, `jobLocations` + `getJob()` — careers board & job detail (14). |
| `faqs.ts` | `homeFaqs` — home FAQ section (per-entity FAQs live on their own seeds). |
| `offices.ts` | `offices` — contact/about office locations. |
| `partners.ts` | `partners` — partnerships ecosystem. |
| `platform.ts` | `platformModules` — `PlatformExplorer` modules on the home page. |
| `team.ts` | `team`, `awards`, `timeline` — about page. |
| `testimonials.ts` | `testimonials` — home & case-study testimonial carousels. |

`src/lib/content.ts` composes `articles + reports + news` into `allArticles`, exposes `blogPosts` /
`researchPosts`, `articleHref`, `kindLabel`, `getAnyArticle`, `relatedArticles`, and `categoriesOf` —
the routing/labels for the four article-detail routes.

---

## 9. Shared-template pages

These page groups share a single template/component, differing only by data:

- **`/industries/[slug]`** — all 10 industries render through one detail template.
- **`/solutions/[slug]`** — all 7 solutions render through one detail template.
- **`/ai-training/[slug]`** — all 5 capabilities render through one detail template.
- **`/case-studies/[slug]`** — all 9 case studies render through one detail template.
- **Four resource detail routes** — `/blog/[slug]`, `/reports/[slug]`, `/research/[slug]`,
  `/newsroom/[slug]` all render through `ArticleDetail` (breadcrumb label/section derived from `kind`).
- **Resource listings** — `/blog`, `/reports`, `/research`, `/newsroom` all use `ResourceListing`
  (PageHero → ResourceListing → CTA).
- **Legal pages** — `/privacy` and `/terms` share the same layout pattern (PageHero → mock note →
  last-updated → max-w-3xl numbered prose).

---

## 10. Bespoke pages

Uniquely composed pages that do not reuse a detail/listing template:

- **Home (`/`)** — custom `HomeHero` + a one-off section sequence.
- **About (`/about`)** — story, team, awards, timeline composition.
- **How we work (`/how-we-work`)** — delivery-model narrative built around `WorkflowSteps`.
- **Partnerships (`/partnerships`)** — partner ecosystem + `PartnershipForm`.
- **Careers (`/careers`)** — culture + filterable job board.
- **Contact (`/contact`)** — `ContactForm` + offices.
- **Events (`/events`)** and **Newsletter (`/newsletter`)** — bespoke layouts that lean on
  `NewsletterForm` and `EventCard` rather than the resource-listing template.
- **State pages** — `not-found.tsx`, `loading.tsx`, `error.tsx` are each one-off.
