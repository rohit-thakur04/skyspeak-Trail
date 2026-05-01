
# Skyspeak Academy — Website

A modern, premium, single-page marketing site (frontend only) with sky/aviation gradient + glassmorphism styling. No backend: forms show toast confirmations only.

## Pages & Routes

- `/` — Main landing page (all sections below, single scroll)
- `/enroll` — Dedicated enrollment form page
- `*` — Existing NotFound

## Sections (Landing Page)

1. **Sticky Navbar** — logo, smooth-scroll links (Courses, Why Us, Highlights, Contact), "Login" + "Enroll Now" buttons. Glass blur on scroll.
2. **Hero** — Full-height, aviation gradient background with AI-generated hero image (cabin crew silhouette + sky). Headline "Fly High with Professional Training", subheading, CTAs: **Enroll Now** (→ /enroll) and **Login** (toast: "Login coming soon"). Subtle floating cloud/plane animation.
3. **Courses** — 6 glass cards in responsive grid, each with custom AI icon image, title, short blurb, hover lift:
   - Air Hostess Training
   - Ground Staff Training
   - Personality Development
   - Spoken English Classes
   - Interview Preparation
   - Tour & Travel Management
4. **Why Choose Us** — 4 feature tiles with icons: 100% Job Assistance, Grooming Sessions, Free Demo Class, Experienced Trainers.
5. **Special Highlights** — Banner strip with stats (Students Trained, Placement Rate, Years Experience, Industry Partners) + bullet highlights (live mock interviews, airport visits, certified curriculum, personality grooming labs).
6. **Contact** — Glass card with phone, email, address + a short "Send us a message" form (Name, Email, Message → toast "Message sent!").
7. **Footer** — Brand line, quick links, socials, copyright.

## Modals & Interactions

- **Quick Enquiry popup** — auto-opens after 4s on first visit (sessionStorage flag so it doesn't re-trigger). Fields: Name, Email, Phone. Submit → toast "Enquiry received — we'll call you soon!" + close. Dismissable with X / Esc / backdrop.
- **Enroll page form** — Full Name, Email, Phone, Course (select with the 6 courses), Submit → toast success + reset.
- All forms validated with **zod + react-hook-form** (required fields, email format, 10-digit phone).

## Toast Notifications (sonner)

- Form submit (enquiry, enroll, contact) → success toast
- Login button click → info toast ("Login coming soon")
- Validation errors → error toast
- Enroll CTA click in hero → smooth navigates to /enroll

## Visual Style

- **Palette**: deep navy → sky blue → cyan gradient backgrounds; gold accent for CTAs; white frosted-glass cards (`backdrop-blur`, semi-transparent white, soft border).
- All colors as HSL tokens in `index.css` (semantic `--primary`, `--accent`, `--gold`, `--glass`, gradient tokens). Tailwind config extends with these.
- Fonts: Playfair Display (headings) + Inter (body) via Google Fonts.
- Animations: fade-in-up on scroll (IntersectionObserver hook), hover-scale on cards, smooth scroll (`scroll-behavior: smooth`), subtle floating clouds in hero, button shine on hover, loading skeleton for images.
- Fully responsive: mobile hamburger menu, single-column stacks at `sm`, 2-col at `md`, 3-col at `lg`.

## AI-Generated Images

Generated once at build via Lovable AI (nano-banana) and saved to `src/assets/`:
- `hero-aviation.jpg` — cinematic cabin crew + sky
- 6 course thumbnails (square, consistent style)
- `highlights-bg.jpg` — runway sunset

Imported as ES modules so Vite hashes them.

## File Structure

```text
src/
  assets/                    (generated images)
  components/
    Navbar.tsx
    Hero.tsx
    Courses.tsx
    CourseCard.tsx
    WhyChooseUs.tsx
    Highlights.tsx
    Contact.tsx
    Footer.tsx
    EnquiryModal.tsx
    GlassCard.tsx            (reusable)
    SectionHeading.tsx       (reusable)
  hooks/
    useScrollReveal.ts
  lib/
    schemas.ts               (zod schemas)
  pages/
    Index.tsx
    Enroll.tsx
    NotFound.tsx
  App.tsx                    (+ /enroll route)
  index.css                  (design tokens, gradients, glass utilities)
tailwind.config.ts           (extended palette, fonts, keyframes)
```

## Notes / Out of Scope

- No backend, no database, no admin panel, no JWT — per your choice. Forms are display-only with toasts.
- If you later want real submissions + admin dashboard, we can layer Lovable Cloud on top without rewriting the UI.
