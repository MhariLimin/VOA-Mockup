# VOA Stage 1 rebuild brief

## Delivery branch

All Bolt edits and commits belong only on `bolt/layout-enhance-1`. The `main` branch is controlled by the project team and must not be edited, committed to, merged into, rebased, reset, or pushed to by Bolt.

## Outcome

Create an original, premium website prototype for Virtual Office Angels. It must feel like a high-trust managed-services company with the clarity of a modern technology product, not a WordPress or page-builder theme.

The rebuild includes:

- complete homepage;
- fixed header and all VOA dropdown options;
- desktop and mobile navigation;
- footer;
- light and dark themes;
- reusable design tokens and components;
- meaningful component animation;
- source-grounded reusable templates for every retained source route;
- Form Submission / Thank You page;
- custom 404 page.

Do not add any other proposed pages.

## Positioning

**Specialist virtual assistants, matched and managed for your business.**

Experienced professionals for finance, property, marketing, technology, and administration—recruited through Australian HR expertise and supported from day one.

Sell specialist fit, Australian HR oversight, managed performance, and continuity—not cheap labour or generic task outsourcing.

Primary site/header CTA: **Get Started Today**
Secondary homepage CTA: **Explore specialist services**

Do not repeat this CTA pair on every service page. Use contextual actions that match the service and the visitor's next step.

## Creative direction

Use the concept **The managed connection**: a client brief connects to a relevant specialist and then to team-leader and backup support. Express this with refined connector lines, profile/workflow cards, task states, role labels, and software chips.

Use reference sites only as a quality benchmark:

- Athena: outcome-first copy and role selection;
- Prialto: distinctive identity and people/process/technology clarity;
- Somewhere: asymmetrical composition and integrated proof;
- Assista: operational UI visuals that make service delivery tangible.

Do not copy their branding, assets, layouts, wording, or claims.

## Visual system

- Manrope headings; Inter body/interface.
- H1 40–64 px; H2 32–48 px; H3 22–32 px; body 16–18 px.
- 1280 px maximum container.
- Desktop: 12 columns, 24 px gaps, 48–80 px gutters.
- Tablet: 8 columns, 20 px gaps, 32 px gutters.
- Mobile: 4 columns, 16 px gaps, 20 px gutters.
- Standard section padding: 88–112 px desktop, 72–88 px tablet, 56–72 px mobile.
- Warm off-white, deep navy, VOA blue, controlled orange, optional muted cyan/teal.
- Cards 16–20 px radius; feature panels 24–32 px; prefer borders over heavy shadows.
- Standard imagery uses consistent 4:3, 3:2, or 4:5 crops and occupies no more than half of split layouts.
- Use semantic design tokens and an 8 px spacing rhythm.

## Header

- Preserve the official Virtual Office Angels logo exactly and display it without a visible white image background. Do not replace it with initials, a text-only VOA mark, or an invented logo. Use the local source asset rather than depending on the staging URL.
- Fixed from initial load through the entire page; never hides on downward scroll.
- 76–80 px desktop and 64–68 px mobile.
- Reserve its height so it never covers content or anchors.
- After 16–24 px scroll it may become slightly denser with a restrained translucent surface and border, without layout shift.
- One primary CTA.
- Desktop dropdowns open on click, not hover alone, and support keyboard operation, Escape, outside-click closing, focus management, and appropriate ARIA state.
- Accessible full-screen accordion menu on mobile.

Navigation:

- Services mega-menu
  - Mortgage & Loans
  - Financial Planning
  - Accounting & Bookkeeping
  - Real Estate & Conveyancing/Administration
  - Back Office & Admin
  - Digital Marketing
  - Sales & Marketing
  - Creative & Copywriting
  - IT & Technology
- How It Works
- Why Virtual Office Angels dropdown
  - Why Virtual Office Angels
  - Client Stories/Testimonials
  - FAQs
- Insights dropdown
  - Articles/Blog
  - Videos & Resources
- About dropdown
  - Our Story
  - Founder/Leadership
  - Contact
- Get Started Today

Every retained destination uses its final path and source-grounded content brief. Never use repeated placeholder pages, `#`, dead links, or homepage redirects.

The staging homepage exposes six primary services; keep those six in the compact homepage overview. Retain all nine source-derived service destinations in the complete Services overview and navigation.

## Internal page composition

- Do not begin every page with the same oversized hero treatment.
- Use varied editorial introductions and layouts appropriate to services, process, about, insights, testimonials, FAQs, and contact.
- Give each service page an accurate local image representing that service.
- Do not repeat "Get Started Today" and "Explore Services" as a generic pair on every service page; use contextual actions or omit a redundant action.
- Keep service lists and cards compact, with controlled typography and vertical spacing.
- Keep Our Story and Founder & Leadership distinct and retain their fuller source-grounded content.
- Place the founder portrait in the Founder & Leadership content rather than reusing it in both About heroes.
- Keep long-form Client Stories and testimonial copy left-aligned.
- Use the full company name "Virtual Office Angels" in normal visible copy instead of repeatedly shortening it to "VOA".

## Homepage sequence

1. Fixed header.
2. Asymmetrical 7/5 hero with proposition, CTAs, honest proof line, and managed-connection visual.
3. Evidence rail using known qualitative signals; no invented statistics.
4. Interactive industry selector and varied bento grid for four specialist industries and five business capabilities.
5. Dark managed-difference section: Specialist Talent, Australian HR Oversight, Built-in Continuity.
6. Five-step process: Discovery, Role Brief, Match & Interview, Onboarding, Managed Support.
7. Premium case-study placeholder clearly marked as requiring verified content.
8. Human operating-model section with non-deceptive portrait placeholders.
9. Six buyer FAQs.
10. High-contrast consultation CTA.
11. Structured footer.

## Motion

- Hero connection sequence runs once over 1.2–1.8 seconds.
- Industry selector updates relevant role/task/tool content in place.
- Desktop process progress rail fills with scroll; mobile uses normal vertical content.
- Cards lift 4–6 px and shift border/arrow on hover and keyboard focus.
- Evidence/case-study groups reveal once without layout movement.
- Header transitions without disappearing or shifting content.
- Micro interactions: 160–220 ms; component transitions: 280–420 ms.
- Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Fully support reduced motion.

The accessible two-second client carousel is the sole approved looping-carousel exception. Do not add other carousels, looping marquees, scroll hijacking, parallax text, particles, a custom cursor, autoplay video, bouncing CTAs, or generic fade-up motion on every section.

## Themes

- Default to `prefers-color-scheme`, persist manual selection, and prevent a wrong-theme flash.
- Provide an accessible 44 × 44 px toggle.
- Light theme: warm off-white canvas, pale surfaces, navy text, blue links, orange CTA.
- Dark theme: near-black navy canvas, raised navy surfaces, warm-white text, accessible cyan/blue links, orange CTA.
- Theme images and diagrams intentionally; never globally invert photographs.
- Both themes must independently meet WCAG 2.2 AA.

## Content integrity

Use Australian English. Do not reproduce legacy grammar, walls of prose, or vague superlatives. Never invent metrics or identities. Label unavailable proof and imagery as requiring VOA verification.

## Verification

Check 320, 360, 390, 768, 1024, 1280, and 1440 px widths. Verify fixed header clearance, dropdown containment, mobile-menu focus/scroll, theme persistence, reduced motion, keyboard access, contrast, direct route refresh, and zero horizontal overflow.
